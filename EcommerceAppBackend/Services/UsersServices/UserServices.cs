using EcommerceAppBackend.Models;

namespace EcommerceAppBackend.Services.UsersServices
{
    public class UserServices : IUserServices
    {
        private readonly JewelSiteDBContext _context;

        public UserServices(JewelSiteDBContext context)
        {
            _context = context;
        }
    }
}
