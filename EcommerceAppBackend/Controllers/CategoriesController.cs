using EcommerceAppBackend.Dtos;
using EcommerceAppBackend.Services.ProductServices;
using GlobalErrorHandling.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using BadRequestException = GlobalErrorHandling.Exceptions.BadRequestException;
using KeyNotFoundException = GlobalErrorHandling.Exceptions.KeyNotFoundException;

namespace EcommerceAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategroiesService _categroiesService;

        public CategoriesController(ICategroiesService categroiesService)
        {
            _categroiesService = categroiesService;
        }

        [HttpGet("GetAllCategories")]
        public async Task<IActionResult> GetAllCategories()
        {
            try{
                var result = await _categroiesService.GetAllCategoriesAsync();
                return Ok(result);
            }
            catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpGet("GetCategoriesById")]
        public async Task<IActionResult> GetCategoriesById(int categoryId)
        {
            try{
                var result = await _categroiesService.GetCategoryByIdAsync(categoryId);
                return Ok(result);
            }
            catch(Exception ex){
                throw new KeyNotFoundException(ex.Message);
            }
        }

        [HttpPost("CreateCategory")]
        public async Task<IActionResult> CreateCategory(Category category)
        {
            try{
                var result = await _categroiesService.CreateCategoryAsync(category);
                return Ok(result);
            }
            catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }
        
        [HttpPut("UpdateCategory")]
        public async Task<IActionResult> UpdateCategory(Category category)
        {
            try{
                var result = await _categroiesService.UpdateCategoryAsync(category);
                return Ok(result);
            }
            catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpDelete("DeleteCategory")]
        public async Task<IActionResult> DeleteCategory(int categoryId)
        {
            try{
                var result = await _categroiesService.DeleteCategoryAsync(categoryId);
                return Ok(result);
            }
            catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }
    }
}
