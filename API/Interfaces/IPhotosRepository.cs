using API.Entities;

namespace API.Interfaces
{
	public interface IPhotosRepository
	{
		Task<IEnumerable<Photo>> GetUnapprovedPhotos();
		Task<Photo> GetPhotoById(int Id);
		void RemovePhoto(Photo photo);
	}
}

