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
	}
}

