using System.Text.Json;
using API.Entities;
using API.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
	public class Seed
	{
		private class JsonHobby
		{
			public string hobby { get; set; }
		}

		public static async Task SeedHobbies(DataContext context)
		{
            if (await context.Hobbies.AnyAsync()) return;

            var hobbiesData = await File.ReadAllTextAsync("Data/HobbiesData.json");
			var jHobbies = JsonSerializer.Deserialize<List<JsonHobby>>(hobbiesData);

			foreach (JsonHobby jHobby in jHobbies)
			{
                await context.Hobbies.AddAsync(new Hobby { Name = jHobby.hobby });
				await context.SaveChangesAsync();
			}
		}

		public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
		{
			if (await userManager.Users.AnyAsync()) return;

			var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

			var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

			var roles = new List<AppRole>
			{
				new AppRole{ Name = Roles.Member },
                new AppRole{ Name = Roles.Admin },
                new AppRole{ Name = Roles.Moderator }
            };


			foreach (var role in roles)
			{
				await roleManager.CreateAsync(role);
			};

			/*TODO: Replace temporary passwords in the future, leave default for now for ease of testing. */
			foreach (var user in users)
			{
				user.UserName = user.UserName.ToLower();

				await userManager.CreateAsync(user, "Pa$$w0rd");
				await userManager.AddToRoleAsync(user, Roles.Member);
				user.Photos.FirstOrDefault().IsApproved = true;
			};

			var admin = new AppUser
			{
				UserName = "admin"
			};

			await userManager.CreateAsync(admin, "Pa$$w0rd");
			await userManager.AddToRolesAsync(admin, new[] { Roles.Admin, Roles.Moderator });
		}
	}
}

