using EcommerceAppBackend.Dtos;

namespace EcommerceAppBackend.Services.ProductServices
{
    public interface ICategroiesService
    {
        public Task<IEnumerable<Category>> GetAllCategoriesAsync();
        public Task<Category> GetCategoryByIdAsync(int categoryId);
        public Task<Category> CreateCategoryAsync(Category category);
        public Task<Category> UpdateCategoryAsync(Category category);
        public Task<bool> DeleteCategoryAsync(int categoryId);
    }
}