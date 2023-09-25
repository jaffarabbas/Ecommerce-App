namespace EcommerceAppBackend.Services.TempUserOrderServices
{
    public interface ITempUserOrderServices
    {
        public Task<Dtos.TempUserOrder> AddTempOrderAsync(Dtos.TempUserOrder tempUserOrder);
        public Task<Dtos.TempUserOrder> GetTempUserOrder();
        public Task<Dtos.TempUserOrder> GetTempUserOrderAsync(int userId);
        public Task<Dtos.TempUserOrder> UpdateTempUserOrderAsync(Dtos.TempUserOrder tempUserOrder);
        public Task<bool> DeleteTempUserOrderAsync(int userId);
    }
}