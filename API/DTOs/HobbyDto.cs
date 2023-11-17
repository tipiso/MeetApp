namespace API.DTOs
{
    public class HobbyDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class UpdateHobbyResponseDto {
        public List<int> selectedHobbies {get; set;}
        public List<int> unselectedHobbies {get; set;}
    }
}
