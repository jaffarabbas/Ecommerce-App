using AutoMapper;
using EcommerceAppBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAppBackend.Services.TempUserOrderServices
{
    public class TempUserOrderServices : ITempUserOrderServices
    {
        private readonly JewelSiteDBContext _context;
        private readonly IMapper _mapper;

        public TempUserOrderServices(JewelSiteDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Dtos.TempUserOrder> AddTempOrderAsync(Dtos.TempUserOrder tempUserOrder)
        {
            var tempUserOrderEntity = _mapper.Map<Models.TempUserOrder>(tempUserOrder);
            var result = await _context.TempUserOrders.AddAsync(tempUserOrderEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<Dtos.TempUserOrder>(result.Entity);
        }

        public async Task<bool> DeleteTempUserOrderAsync(int userId)
        {
            var tempUserOrderEntity = await _context.TempUserOrders.FirstOrDefaultAsync(x => x.Id == userId);
            var result = _context.TempUserOrders.Remove(tempUserOrderEntity!);
            return result != null ? true : false;
        }

        public async Task<Dtos.TempUserOrder> GetTempUserOrder()
        {
            return await _context.TempUserOrders?.Select(x => _mapper.Map<Dtos.TempUserOrder>(x))?.FirstOrDefaultAsync()!;
        }


        public async Task<Dtos.TempUserOrder> GetTempUserOrderAsync(int userId)
        {
            return await _context.TempUserOrders?.Where(x => x.Id == userId)?.Select(x => _mapper.Map<Dtos.TempUserOrder>(x))?.FirstOrDefaultAsync()!; 
        }

        public async Task<Dtos.TempUserOrder> UpdateTempUserOrderAsync(Dtos.TempUserOrder tempUserOrder)
        {
            var tempUserOrderEntity = _mapper.Map<Models.TempUserOrder>(tempUserOrder);
            var result = _context.TempUserOrders.Update(tempUserOrderEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<Dtos.TempUserOrder>(result.Entity);
        }

    }
}