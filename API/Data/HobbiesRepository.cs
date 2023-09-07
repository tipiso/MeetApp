using API.Entities;
using API.Interfaces;

namespace API.Data
{
	public class HobbiesRepository : IHobbiesRepository
	{
		public HobbiesRepository()
		{
		}

        public void AddHobby(Hobby hobby)
        {
            throw new NotImplementedException();
        }

        public void DeleteHobby(Hobby hobby)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Hobby>> GetHobbies()
        {
            throw new NotImplementedException();
        }
    }
}

