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

        public AdminController(UserManager<AppUser> userManager, IUnitOfWork uow)
		{
			_userManager = userManager;
			_uow = uow;
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

		[HttpGet("photos")]
		public async Task<ActionResult> GetPhotosForApproval()
		{
			var unapprovedPhotos = await _uow.PhotosRepository.GetUnapprovedPhotos();
			return Ok(unapprovedPhotos);
		}

		[HttpPut("photos/approve")]
		public async Task<ActionResult> ApprovePhoto(int Id)
		{
			var photo = await _uow.PhotosRepository.GetPhotoById(Id);

			if (photo == null) return BadRequest("Photo with given ID doesn't exist");

			photo.IsApproved = true;
			
			if (!photo.AppUser.Photos.Any(p => p.IsMain)) photo.IsMain = true;

			if (_uow.HasChanges()) await _uow.Complete();

			return Ok(photo);
		}

		[HttpPut("photos/reject")]
		public async Task<ActionResult> RejectPhoto(int Id)
		{
            var photo = await _uow.PhotosRepository.GetPhotoById(Id);

            if (photo == null) return BadRequest("Photo with given ID doesn't exist");

            photo.IsApproved = false;

            if (_uow.HasChanges()) await _uow.Complete();

            return Ok(photo);
        }
	}
}

