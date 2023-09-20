using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class HobbiesController : BaseApiController
	{
        private readonly IUnitOfWork _uow;

        public HobbiesController(IUnitOfWork uow)
		{
			_uow = uow;
		}

		[HttpGet]
		public async Task<ActionResult<List<Hobby>>> GetHobbies()
		{
			return Ok(await _uow.HobbiesRepository.GetHobbies());
		}

        [HttpPut("{username}")]
        public async Task<ActionResult<List<Hobby>>> UpdateUserHobbies(string username, int[] hobbies)
        {
            if (hobbies.Length == 0) return BadRequest();

            var user = await _uow.UserRepository.GetUserByUsernameAsync(username);

            var unselectedHobbies = user.UserHobbies.Where(u => !hobbies.Contains(u.HobbyId));
            var selectedHobbies = hobbies.Where(h => !user.UserHobbies.Select(u => u.HobbyId).Contains(h));

            if (unselectedHobbies.Any())
            {
                // Remove those which were removed
                foreach (UserHobby hobby in unselectedHobbies)
                {
                    user.UserHobbies.Remove(hobby);
                }
            }

            if (selectedHobbies.Any())
            {
                foreach (int hobby in selectedHobbies)
                {
                    user.UserHobbies.Add(new UserHobby { HobbyId = hobby, UserId = user.Id });
                }
            }

            return Ok(await _uow.HobbiesRepository.GetHobbies());
        }
    }
}

