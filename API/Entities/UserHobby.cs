namespace API.Entities
{
	public class UserHobby
	{
        public virtual AppUser User { get; set; }
        public int UserId { get; set; }

        public virtual Hobby Hobby { get; set; }
        public int HobbyId { get; set; }
    }
}

