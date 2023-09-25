using AutoMapper;
using EcommerceAppBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAppBackend.Services.UserOrderServices
{
    public class UserOrderServices : IUserOrderServices
    {
        private readonly JewelSiteDBContext _context;
        private IMapper _mapper;
        public UserOrderServices(JewelSiteDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Dtos.UserOrder> AddOrderAsync(Dtos.UserOrder userOrder)
        {
            var userOrderEntity = _mapper.Map<Models.UserOrder>(userOrder);
            var result = await _context.UserOrders.AddAsync(userOrderEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<Dtos.UserOrder>(result.Entity);
        }

        public async Task<bool> DeleteOrderAsync(int id)
        {
            var userOrderEntity = await _context.UserOrders.FirstOrDefaultAsync(x => x.Oid == id);
            var result = _context.UserOrders.Remove(userOrderEntity!);
            return result != null ? true : false;
        }

        public async Task<IEnumerable<Dtos.UserOrder>> GetAllOrdersAsync()
        {
            return await _context.UserOrders.Select(x => _mapper.Map<Dtos.UserOrder>(x)).ToListAsync();
        }

        public async Task<Dtos.UserOrder> GetOrderAsync(int id)
        {
            return await _context.UserOrders?.Where(x => x.Oid == id)?.Select(x => _mapper.Map<Dtos.UserOrder>(x))?.FirstOrDefaultAsync()!;
        }

        public async Task<Dtos.UserOrder> UpdateOrderAsync(Dtos.UserOrder userOrder)
        {
            var userOrderEntity = _mapper.Map<Models.UserOrder>(userOrder);
            var result = _context.UserOrders.Update(userOrderEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<Dtos.UserOrder>(result.Entity);
        }

    }
}