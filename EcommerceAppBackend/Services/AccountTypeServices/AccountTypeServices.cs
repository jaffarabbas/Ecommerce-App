using AutoMapper;
using EcommerceAppBackend.Dtos;
using EcommerceAppBackend.Models;
using Microsoft.EntityFrameworkCore;

using AccountType = EcommerceAppBackend.Dtos.AccountType;

namespace EcommerceAppBackend.Services.AccountTypeServices
{
    public class AccountTypeServices : IAccountTypeServices
    {
        private JewelSiteDBContext _context;
        private readonly IMapper _mapper;

        public AccountTypeServices(JewelSiteDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<AccountType> AddAccountTypeAsync(AccountType accountType)
        {
            var accountTypeEntity = _mapper.Map<Models.AccountType>(accountType);
            var result = await _context.AccountTypes.AddAsync(accountTypeEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<AccountType>(result.Entity);
        }

        public async Task<bool> DeleteAccountTypeAsync(int id)
        {
            var accountTypeEntity = await _context.AccountTypes.FirstOrDefaultAsync(x => x.Id == id);
            var result = _context.AccountTypes.Remove(accountTypeEntity!);
            return result != null ? true : false;
        }

        public async Task<AccountType> GetAccountTypeAsync(int id)
        {
            return await _context.AccountTypes?.Where(x => x.Id == id)?.Select(x => _mapper.Map<AccountType>(x))?.FirstOrDefaultAsync()!;
        }

        public async Task<IEnumerable<AccountType>> GetAccountTypesAsync()
        {
            return await _context.AccountTypes.Select(x => _mapper.Map<AccountType>(x)).ToListAsync();
        }

        public async Task<AccountType> UpdateAccountTypeAsync(AccountType accountType)
        {
            var accountTypeEntity = _mapper.Map<Models.AccountType>(accountType);
            var result = _context.AccountTypes.Update(accountTypeEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<AccountType>(result.Entity);
        }
    }
}