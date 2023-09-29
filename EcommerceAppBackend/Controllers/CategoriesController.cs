using EcommerceAppBackend.Constants;
using EcommerceAppBackend.Dtos;
using EcommerceAppBackend.Helper;
using EcommerceAppBackend.Services.CategoriesServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using BadRequestException = CustomMiddlewareCollection.GlobalExceptionHandler.Exceptions.BadRequestException;
using KeyNotFoundException = CustomMiddlewareCollection.GlobalExceptionHandler.Exceptions.KeyNotFoundException;

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
                return new ApiHitResponse(result, ApiResponseMessages.success, ApiStatusCodes.OK);
            }
            catch(Exception ex){
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(ex), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        [HttpGet("GetCategoriesById")]
        public async Task<IActionResult> GetCategoriesById(int categoryId)
        {
            try{
                var result = await _categroiesService.GetCategoryByIdAsync(categoryId);
                return new ApiHitResponse(result, ApiResponseMessages.success, ApiStatusCodes.OK);
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
                return new ApiHitResponse(result, ApiResponseMessages.success, ApiStatusCodes.OK);
            }
            catch(Exception ex){
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(ex), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }
        
        [HttpPut("UpdateCategory")]
        public async Task<IActionResult> UpdateCategory(Category category)
        {
            try{
                var result = await _categroiesService.UpdateCategoryAsync(category);
                return new ApiHitResponse(result, ApiResponseMessages.success, ApiStatusCodes.OK);
            }
            catch(Exception ex){
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(ex), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        [HttpDelete("DeleteCategory")]
        public async Task<IActionResult> DeleteCategory(int categoryId)
        {
            try{
                var result = await _categroiesService.DeleteCategoryAsync(categoryId);
                return new ApiHitResponse(result, ApiResponseMessages.success, ApiStatusCodes.OK);
            }
            catch(Exception ex){
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(ex), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }
    }
}
