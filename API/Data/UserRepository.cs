using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<MemberDto> GetMemberAsync(string username, string currentUsername)
        {
            var isCurrentUser = false;
			if (currentUsername == username)
			{
				isCurrentUser = true;
			}

            var query = _context.Users
                .Where(x => x.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

            if (isCurrentUser) query = query.IgnoreQueryFilters();

            var member = await query.SingleOrDefaultAsync();

            if (!isCurrentUser)
            {
                var currentUser = await _context.Users
                    .Include(u => u.LikedUsers)
                    .FirstOrDefaultAsync(u => u.UserName == currentUsername);

                var isLikedByCurrentUser = currentUser
                    .LikedUsers
                    .Find(lu => lu.TargetUserId == member.Id);

                member.IsLikedByCurrentUser = isLikedByCurrentUser != null;
            }

            return member;
        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();
            var currentUser = await GetUserByUsernameAsync(userParams.CurrentUsername);

            query = query.Where(u => u.UserName != userParams.CurrentUsername);
            query = query.Where(u => u.Gender == userParams.Gender);
            query = query.Where(u => !u.LikedByUsers.Select(l => l.SourceUserId).Contains(currentUser.Id));

            if (userParams.Hobbies != null && userParams.Hobbies.Length > 0)
            {
                query = query
                .Where(u => u.UserHobbies
                .Any(uh => userParams.Hobbies.Contains(uh.HobbyId)));
            }

            if (!String.IsNullOrEmpty(userParams.SearchString))
            {
                query = query.Where(u => u.UserName.Contains(userParams.SearchString) || u.KnownAs.Contains(userParams.SearchString));
            }

            var minDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MaxAge - 1));
            var maxDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MinAge));

            query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive)
            };


            return await PagedList<MemberDto>.CreateAsync(
                query.AsNoTracking().ProjectTo<MemberDto>(_mapper.ConfigurationProvider),
                userParams.PageNumber,
                userParams.PageSize);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            var user = await _context.Users
                .Include(p => p.Photos)
                .Include(p => p.UserHobbies)
                .FirstOrDefaultAsync(user => user.UserName == username);
            return user;
        }

        public async Task<AppUser> GetUserByIdAsync(int userId)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(user => user.Id == userId);
            return user;
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p => p.Photos)
                .ToListAsync();
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public async Task<string> GetUserGender(string username)
        {
            return await _context.Users.
                Where(x => x.UserName == username)
                .Select(x => x.Gender).FirstOrDefaultAsync();
        }

        public async Task<AppUser> GetUserByPhotoId(int photoId)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .IgnoreQueryFilters()
                .Where(p => p.Photos.Any(p => p.Id == photoId))
                .FirstOrDefaultAsync();
        }
    }
}

