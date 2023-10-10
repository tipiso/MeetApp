using API.Entities;

namespace API.Interfaces
{
	public interface IHobbiesRepository
	{
        void AddHobby(Hobby hobby);
        void DeleteHobby(Hobby hobby);
        Task<IEnumerable<Hobby>> GetHobbies();
    }
}

