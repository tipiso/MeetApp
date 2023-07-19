using API.Entities;
using API.Enums;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	public class AdminController : BaseApiController
	{
		private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _uow;
        private readonly IPhotoService _photoService;

        public AdminController(UserManager<AppUser> userManager, IUnitOfWork uow, IPhotoService photoService)
		{
			_userManager = userManager;
			_uow = uow;
            _photoService = photoService;
        }

		[Authorize(Policy = Policies.RequireAdmin)]
		[HttpGet("users-with-roles")]
		public async Task<ActionResult> GetUsersWithRoles()
		{
			var users = await _userManager.Users.
				OrderBy(u => u.UserName)
				.Select(u => new
				{
					u.Id,
					Username = u.UserName,
					Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
				})
				.ToListAsync();

			return Ok(users);
		}

		[Authorize(Policy = Policies.RequireAdmin)]
		[HttpPost("edit-role/{username}")]
		public async Task<ActionResult> EditRoles(string username, [FromQuery]string roles)
		{
			if (string.IsNullOrEmpty(roles)) return BadRequest("You must select a role");

			var selectedRoles = roles.Split(",").ToArray();

			var user = await _userManager.FindByNameAsync(username);

			if (user == null) return NotFound();

			var userRoles = await _userManager.GetRolesAsync(user);

			var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

			if (!result.Succeeded) return BadRequest("Failed to add roles");

			result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

			if (!result.Succeeded) return BadRequest("Failed to remove from roles");

			return Ok(await _userManager.GetRolesAsync(user));
		}

		[Authorize(Policy = Policies.ModeratePhoto)]
		[HttpGet("photos-to-moderate")]
		public ActionResult GetPhotosForModeration()
		{
			return Ok("Admins or moderators can see this");
		}

        [Authorize(Policy = Policies.ModeratePhoto)]
        [HttpGet("photos")]
		public async Task<ActionResult> GetPhotosForApproval()
		{
			var unapprovedPhotos = await _uow.PhotosRepository.GetUnapprovedPhotos();
			return Ok(unapprovedPhotos);
		}

        [Authorize(Policy = Policies.ModeratePhoto)]
        [HttpPut("photos/approve/{id}")]
		public async Task<ActionResult> ApprovePhoto(int id)
		{
			var photo = await _uow.PhotosRepository.GetPhotoById(id);

			if (photo == null) return NotFound("Photo with given ID doesn't exist");

			photo.IsApproved = true;

			var user = await _uow.UserRepository.GetUserByPhotoId(photo.Id);

			if (!user.Photos.Any(p => p.IsMain)) photo.IsMain = true;

			if (_uow.HasChanges()) await _uow.Complete();

			return Ok(photo);
		}

        [Authorize(Policy = Policies.ModeratePhoto)]
        [HttpPost("photos/reject/{id}")]
		public async Task<ActionResult> RejectPhoto(int id)
		{
            var photo = await _uow.PhotosRepository.GetPhotoById(id);

            if (photo == null) return BadRequest("Photo with given ID doesn't exist");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Result == "ok")
                {
                    _uow.PhotosRepository.RemovePhoto(photo);
                }
            }
            else
            {
                _uow.PhotosRepository.RemovePhoto(photo);
            }

			await _uow.Complete();

			return Ok();
        }
	}
}

