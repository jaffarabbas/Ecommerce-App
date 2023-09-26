using CustomMiddlewareCollection.GlobalExceptionHandler.Exceptions;
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
                return Ok(products);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpGet("GetProduct/{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            try{
                var product = await _productServices.GetProductAsync(id);
                return Ok(product);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProduct(Dtos.Product product)
        {
            try{
                var result = await _productServices.AddProductAsync(product);
                return Ok(result);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpPut("UpdateProduct")]
        public async Task<IActionResult> UpdateProduct(Dtos.Product product)
        {
            try{
                var result = await _productServices.UpdateProductAsync(product);
                return Ok(result);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpDelete("DeleteProduct/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try{
                var result = await _productServices.DeleteProductAsync(id);
                return Ok(result);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }
    }
}
