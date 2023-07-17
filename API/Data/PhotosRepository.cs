using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PhotosRepository : IPhotosRepository
	{
		private readonly DataContext _context;

		public PhotosRepository(DataContext dbContext)
		{
			_context = dbContext;
		}

        public Task<Photo> GetPhotoById(int Id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Photo>> GetUnapprovedPhotos()
        {
            return await _context.Photos.Where(p => !p.IsApproved)
                .IgnoreQueryFilters()
                .ToListAsync();
        }

            public void RemovePhoto(Photo photo)
        { 
            _context.Photos.Remove(photo);
        }
    }
}

