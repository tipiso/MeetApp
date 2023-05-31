
using System.Security.Claims;

namespace API.Extensions
{
	public static class ClaimsPrincipalExtensions
	{
		public static string GetUsername(this ClaimsPrincipal user)
		{
            return user.FindFirst(ClaimTypes.Name).Value;
        }

        public static int GetUserId(this ClaimsPrincipal user)
        {
            string userId = user.FindFirst(ClaimTypes.NameIdentifier).Value;
            try
            {
                int parsedUserId = Int32.Parse(user.FindFirst(ClaimTypes.NameIdentifier).Value);
                return parsedUserId;
            }
            catch (FormatException)
            {
                Console.WriteLine($"Unable to parse '{userId}'");
            }

            return -1;
        }

    }
}

