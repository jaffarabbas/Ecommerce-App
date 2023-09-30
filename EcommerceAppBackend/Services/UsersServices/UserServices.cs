using AutoMapper;
using EcommerceAppBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAppBackend.Services.UsersServices
{
    public class UserServices : IUserServices
    {
        private readonly JewelSiteDBContext _context;
        private readonly IMapper _mapper;

        public UserServices(JewelSiteDBContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Dtos.User>> GetAllUsers()
        {
            return await _context.Users.Select(x => _mapper.Map<Dtos.User>(x)).ToListAsync();
        }
        public async Task<Dtos.User> GetUserById(int id)
        {
            var result = await _context.Users.Where(x => x.Uid == id).Select(x => _mapper.Map<Dtos.User>(x)).FirstOrDefaultAsync();
            return result != null ? result : throw new KeyNotFoundException("User not found");
        }
        public async Task<bool> DeleteUser(int id)
        {
            var result = await GetUserById(id);
            _context.Users.Remove(_mapper.Map<Models.User>(result));
            await _context.SaveChangesAsync();
            return result != null ? true : false;
        }
        public async Task<Dtos.User> Register(Dtos.User user)
        {
            var result = await _context.Users.AddAsync(_mapper.Map<Models.User>(user));
            await _context.SaveChangesAsync();
            return _mapper.Map<Dtos.User>(result.Entity);
        }
        public async Task<Dtos.User> UpdateUser(Dtos.User user)
        {
            var data = _context.Users.Update(_mapper.Map<Models.User>(user));
            await _context.SaveChangesAsync();
            return _mapper.Map<Dtos.User>(data.Entity);
        }

        public async Task<bool> CheckUserExist(Dtos.User user)
        {
            var checkEmailExist = await _context.Users.FirstOrDefaultAsync(x => x.Email == user.Email);
            return checkEmailExist != null ? true : false;
        }
    }
}
