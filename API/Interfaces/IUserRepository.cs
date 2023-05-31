﻿using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
	public interface IUserRepository
	{
		void Update(AppUser user);

		Task<bool> SaveAllAsync();
		Task<IEnumerable<AppUser>> GetUsersAsync();
		Task<AppUser> GetUserByUsernameAsync(string username);
		Task<AppUser> GetUserByIdAsync(int userId);
		Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
		Task<MemberDto> GetMemberAsync(string username);
	}
}

