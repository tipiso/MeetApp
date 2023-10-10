using API.Entities;

namespace API.Interfaces
{
	public interface IHobbiesRepository
	{
        void AddHobby(Hobby hobby);
        void DeleteHobby(Hobby hobby);
        void DeleteUserHobby(UserHobby userHobby);
        Task<IEnumerable<Hobby>> GetHobbies();
    }
}

