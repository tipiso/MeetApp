namespace API.Entities
{
	public class UserHobby
	{
        public AppUser User { get; set; }
        public int UserId { get; set; }

        public Hobby Hobby { get; set; }
        public int HobbyId { get; set; }
    }
}

