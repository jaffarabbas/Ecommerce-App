using AutoMapper;
using EcommerceAppBackend.Models;

namespace EcommerceAppBackend.Services.ProductServices
{
    public class ProductServices : IProductServices
    {
        private readonly JewelSiteDBContext _context;
        private readonly IMapper _mapper;  

        public ProductServices(JewelSiteDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Task<Dtos.Product> AddProductAsync(Dtos.Product product)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteProductAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Dtos.Product> GetProductAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Dtos.Product>> GetProductsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Dtos.Product> UpdateProductAsync(Dtos.Product product)
        {
            throw new NotImplementedException();
        }

    }
}