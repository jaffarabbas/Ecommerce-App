namespace EcommerceAppBackend.Services.UserOrderServices
{
    public interface IUserOrderServices
    {
        public Task<Dtos.UserOrder> AddOrderAsync(Dtos.UserOrder userOrder);
        public Task<IEnumerable<Dtos.UserOrder>> GetAllOrdersAsync();
        public Task<Dtos.UserOrder> GetOrderAsync(int id);
        public Task<Dtos.UserOrder> UpdateOrderAsync(Dtos.UserOrder userOrder); 
        public Task<bool> DeleteOrderAsync(int id);
    }
}