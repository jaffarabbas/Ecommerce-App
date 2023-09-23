using AutoMapper;
using EcommerceAppBackend.Dtos;
using EcommerceAppBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAppBackend.Services.ProductServices
{
    public class CategoriesService : ICategroiesService
    {
        private readonly JewelSiteDBContext _context;
        private readonly IMapper _mapper;

        public CategoriesService(JewelSiteDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Dtos.Category> CreateCategoryAsync(Dtos.Category category)
        {
            var categoryEntity = _mapper.Map<Models.Category>(category);
            var result = await _context.Categories.AddAsync(categoryEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<Dtos.Category>(result.Entity);
        }

        public async Task<bool> DeleteCategoryAsync(int categoryId)
        {
            var category = await GetCategoryByIdAsync(categoryId);
            _context.Categories.Remove(_mapper.Map<Models.Category>(category));
            await _context.SaveChangesAsync();
            return category != null ? true : false;
        }

        public async Task<IEnumerable<Dtos.Category>> GetAllCategoriesAsync()
        {
            return await _context.Categories.Select(x => _mapper.Map<Dtos.Category>(x)).ToListAsync();
        }

        public async Task<Dtos.Category> GetCategoryByIdAsync(int categoryId)
        {
            var result = await _context.Categories.Where(x => x.Cid == categoryId).Select(x => _mapper.Map<Dtos.Category>(x)).FirstOrDefaultAsync();
            return result != null ? result : throw new Exception("Category not found");
        }

        public async Task<Dtos.Category> UpdateCategoryAsync(Dtos.Category category)
        {
            var categoryEntity = _mapper.Map<Models.Category>(category);
            var result = _context.Categories.Update(categoryEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<Dtos.Category>(result.Entity);
        }

    }
}