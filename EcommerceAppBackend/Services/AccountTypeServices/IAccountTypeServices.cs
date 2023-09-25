namespace EcommerceAppBackend.Services.AccountTypeServices
{
    public interface IAccountTypeServices
    {
        public Task<IEnumerable<Dtos.AccountType>> GetAccountTypesAsync();
        public Task<Dtos.AccountType> GetAccountTypeAsync(int id);
        public Task<Dtos.AccountType> AddAccountTypeAsync(Dtos.AccountType accountType);
        public Task<Dtos.AccountType> UpdateAccountTypeAsync(Dtos.AccountType accountType);
        public Task<bool> DeleteAccountTypeAsync(int id);
    }
}