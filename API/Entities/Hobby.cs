using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Hobbies")]
	public class Hobby
	{
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public List<AppUser> Users { get; set; }
        public List<UserHobby> AppUsers { get; set; }
    }
}

