using EcommerceAppBackend.Dtos;

namespace EcommerceAppBackend.Services.UsersServices
{
    public interface IUserServices
    {
        Task<User> Register(User user);
        Task<User> GetUserById(int id);
        Task<User> UpdateUser(User user);
        Task<bool> DeleteUser(int id);
        Task<IEnumerable<User>> GetAllUsers();
    }
}
