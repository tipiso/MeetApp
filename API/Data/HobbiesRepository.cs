using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
	public class HobbiesRepository : IHobbiesRepository
	{
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public HobbiesRepository(DataContext context, IMapper mapper)
		{
            _context = context;
            _mapper = mapper;
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

        public async Task<IEnumerable<HobbyDto>> GetHobbies()
        {
            return await _context.Hobbies
                .ProjectTo<HobbyDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}

