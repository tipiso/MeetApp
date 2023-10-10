using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
	public class HobbiesRepository : IHobbiesRepository
	{
        private readonly DataContext _context;

        public HobbiesRepository(DataContext context)
		{
            _context = context;
		}

        public void AddHobby(Hobby hobby)
        {
            _context.Hobbies.AddAsync(hobby);
        }

        public void DeleteHobby(Hobby hobby)
        {
            _context.Hobbies.Remove(hobby);
        }

        public void DeleteUserHobby(UserHobby userHobby)
        {
            _context.UserHobbies.Remove(userHobby);
        }

        public async Task<IEnumerable<Hobby>> GetHobbies()
        {
            return await _context.Hobbies.ToListAsync();
        }
    }
}

