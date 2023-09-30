using TRACKIT_BACKEND_API.Dtos;

namespace EcommerceAppBackend.Models
{
    public class UserTokenResponse
    {
        public User? User { get; set; } 
        public TokenResponse? Token { get; set; }
    }
}
