namespace EcommerceAppBackend.Services.ProductServices
{
    public interface IProductServices
    {
        public Task<IEnumerable<Dtos.Product>> GetProductsAsync();
        public Task<Dtos.Product> GetProductAsync(int id);
        public Task<IEnumerable<Dtos.Product>> GetProductByCIDAsync(int id);
        public Task<Dtos.Product> AddProductAsync(Dtos.Product product);
        public Task<Dtos.Product> UpdateProductAsync(Dtos.Product product);
        public Task<bool> DeleteProductAsync(int id);
    }
}