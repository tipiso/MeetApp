using API.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	public class AdminController : BaseApiController
	{
		[Authorize(Policy = Policies.RequireAdmin)]
		[HttpGet("users-with-roles")]
		public ActionResult GetUsersWithRoles()
		{
			return Ok("Only admin can see this");
		}

		[Authorize(Policy = Policies.ModeratePhoto)]
		[HttpGet("photos-to-moderate")]
		public ActionResult GetPhotosForModeration()
		{
			return Ok("Admins or moderators can see this");
		}
	}
}

