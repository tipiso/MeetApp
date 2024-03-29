using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
	public class AutoMapperProfiles : Profile
	{
		public AutoMapperProfiles()
		{
			CreateMap<Hobby, HobbyDto>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
			CreateMap<AppUser, MemberDto>()
				.ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
				.ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()))
				.ForMember(dest => dest.Hobbys, opt => opt.MapFrom(src => src.Hobbies.OrderBy(h => h.Name.Length)));
			CreateMap<Photo, PhotoDto>();
			CreateMap<MemberUpdateDto, AppUser>()
				.ForMember(x => x.Hobbies, y => y.Ignore())
				.ForMember(x => x.AccessFailedCount, y => y.Ignore())
				.ForMember(x => x.ConcurrencyStamp, y => y.Ignore())
				.ForMember(x => x.TwoFactorEnabled, y => y.Ignore())
				.ForMember(x => x.UserRoles, y => y.Ignore())
				.ForMember(x => x.Hobbies, y => y.Ignore())
				.ForMember(x => x.PhoneNumber, y => y.Ignore())
				.ForMember(x => x.LockoutEnd, y => y.Ignore())
				.ForMember(x => x.LockoutEnabled, y => y.Ignore())
				.ForMember(x => x.SecurityStamp, y => y.Ignore())
				.ForMember(x => x.PhoneNumber, y => y.Ignore());
			CreateMap<RegisterDto, AppUser>();
			CreateMap<Message, MessageDto>()
				.ForMember(dest => dest.SenderPhotoUrl,
				o => o.MapFrom(s => s.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
				.ForMember(dest => dest.RecipientPhotoUrl,
				o => o.MapFrom(s => s.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url));
			CreateMap<DateTime, DateTime>().ConvertUsing(d => DateTime.SpecifyKind(d, DateTimeKind.Utc));
			CreateMap<DateTime?, DateTime?>().ConvertUsing(d => d.HasValue ? DateTime.SpecifyKind(d.Value, DateTimeKind.Utc) : null);
		}
	}
}

