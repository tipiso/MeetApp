using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
	public interface IPhotosRepository
	{
		Task<IEnumerable<PhotoForApprovalDto>> GetUnapprovedPhotos();
		Task<Photo> GetPhotoById(int id);
		void RemovePhoto(Photo photo);
	}
}

