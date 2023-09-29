using CustomMiddlewareCollection.GlobalExceptionHandler.Exceptions;
using EcommerceAppBackend.Constants;
using EcommerceAppBackend.Helper;
using EcommerceAppBackend.Services.ProductServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductServices _productServices;

        public ProductsController(IProductServices productServices)
        {
            _productServices = productServices;
        }

        [HttpGet("GetProducts")]
        public async Task<IActionResult> GetProducts()
        {
            try{
                var products = await _productServices.GetProductsAsync();
                return new ApiHitResponse(products, ApiResponseMessages.success, ApiStatusCodes.OK);
            }catch(Exception ex){
               return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(ex), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        [HttpGet("GetProduct/{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            try{
                var product = await _productServices.GetProductAsync(id);
                return new ApiHitResponse(product, ApiResponseMessages.success, ApiStatusCodes.OK);
            }catch(Exception ex){
               return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(ex), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProduct(Dtos.Product product)
        {
            try{
                var result = await _productServices.AddProductAsync(product);
                return new ApiHitResponse(result, ApiResponseMessages.success, ApiStatusCodes.OK);
            }catch(Exception ex){
               return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(ex), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        [HttpPut("UpdateProduct")]
        public async Task<IActionResult> UpdateProduct(Dtos.Product product)
        {
            try{
                var result = await _productServices.UpdateProductAsync(product);
                return new ApiHitResponse(result, ApiResponseMessages.success, ApiStatusCodes.OK);
            }catch(Exception ex){
               return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(ex), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        [HttpDelete("DeleteProduct/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try{
                var result = await _productServices.DeleteProductAsync(id);
                return new ApiHitResponse(result, ApiResponseMessages.success, ApiStatusCodes.OK);
            }catch(Exception ex){
               return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(ex), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }
    }
}
