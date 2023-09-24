namespace TRACKIT_BACKEND_API.Dtos
{
    public class TokenResponse
    {
        public string JWTToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
