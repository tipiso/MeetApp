using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Hobbies")]
	public class Hobby
	{
        public int Id { get; set; }
        public string Name { get; set; }
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}

