using System.Security.Claims;
using TRACKIT_BACKEND_API.Dtos;

namespace EcommerceAppBackend.Repositories
{
    public interface IRefreshTokenGenerator
    {
        public string GenerateToken(int uuid);
    }
}
