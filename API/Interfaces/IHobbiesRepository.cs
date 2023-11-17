using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IHobbiesRepository
    {
        void AddHobby(Hobby hobby);
        void DeleteHobby(Hobby hobby);
        void DeleteUserHobby(UserHobby userHobby);
        UpdateHobbyResponseDto UpdateUserHobby(AppUser user, HobbiesUpdateDto hobbiesDto);
        Task<IEnumerable<HobbyDto>> GetHobbies();
    }
}

