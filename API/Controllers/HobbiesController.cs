using API.DTOs;
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
        public async Task<ActionResult<List<Hobby>>> UpdateUserHobbies(string username,[FromBody] HobbiesUpdateDto hobbiesDto)
        {
            var user = await _uow.UserRepository.GetUserByUsernameAsync(username);
            
            var unselectedHobbies = user.UserHobbies.Where(u => !hobbiesDto.hobbies.Contains(u.HobbyId));
            var selectedHobbies = hobbiesDto.hobbies.Where(h => !user.UserHobbies.Select(u => u.HobbyId).Contains(h));
            var responseDto = new 
            { 
                selectedHobbies = selectedHobbies.ToList(), 
                unselectedHobbies = unselectedHobbies.Select(uh => uh.HobbyId).ToList() 
            };

            if (unselectedHobbies.Any())
            {
                foreach (UserHobby hobby in unselectedHobbies)
                {
                    _uow.HobbiesRepository.DeleteUserHobby(hobby);
                }
            }

            if (selectedHobbies.Any())
            {
                foreach (int hobby in selectedHobbies)
                {
                    user.UserHobbies.Add(new UserHobby { HobbyId = hobby, UserId = user.Id });
                }
            }

            if (_uow.HasChanges())
            {
                await _uow.Complete();
                return Ok(responseDto);
            }

            return BadRequest("Failed to update hobbies");
        }
    }
}

