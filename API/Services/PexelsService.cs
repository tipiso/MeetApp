using API.Helpers;
using Microsoft.Extensions.Options;
using PexelsDotNetSDK.Api;

namespace API.Services
{
    public class PexelsService
    {
        private readonly PexelsClient _pexels;

        public PexelsService(IOptions<PexelsSettings> config)
        {
            _pexels = new PexelsClient(config.Value.ApiKey);
        }

        public PexelsClient GetService()
        {
            return _pexels;
        }


    }
}