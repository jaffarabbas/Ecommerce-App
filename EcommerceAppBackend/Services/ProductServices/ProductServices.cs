using AutoMapper;
using EcommerceAppBackend.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task<Dtos.Product> AddProductAsync(Dtos.Product product)
        {
            var productEntity = _mapper.Map<Models.Product>(product);
            var result = await _context.Products.AddAsync(productEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<Dtos.Product>(result.Entity);
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var productEntity = await _context.Products.FirstOrDefaultAsync(x => x.Pid == id);
            var result = _context.Products.Remove(productEntity!);
            await _context.SaveChangesAsync();
            return result != null ? true : false;
        }

        public async Task<Dtos.Product> GetProductAsync(int id)
        {
            return await _context.Products?.Where(x => x.Pid == id)?.Select(x => _mapper.Map<Dtos.Product>(x))?.FirstOrDefaultAsync()!;
        }

        public async Task<IEnumerable<Dtos.Product>> GetProductByCIDAsync(int id)
        {
            return await _context.Products.Where(c => c.Cid == id).Select(x => _mapper.Map<Dtos.Product>(x)).ToListAsync();
        }

        public async Task<IEnumerable<Dtos.Product>> GetProductsAsync()
        {
            return await _context.Products.Select(x => _mapper.Map<Dtos.Product>(x)).ToListAsync();
        }

        public async Task<Dtos.Product> UpdateProductAsync(Dtos.Product product)
        {
            var productEntity = _mapper.Map<Models.Product>(product);
            var result = _context.Products.Update(productEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<Dtos.Product>(result.Entity);
        }

    }
}