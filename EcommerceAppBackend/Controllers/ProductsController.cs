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
        public IActionResult GetProducts()
        {
            try{
                var products = _productServices.GetProductsAsync();
                return Ok(products);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpGet("GetProduct/{id}")]
        public IActionResult GetProduct(int id)
        {
            try{
                var product = _productServices.GetProductAsync(id);
                return Ok(product);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpPost("AddProduct")]
        public IActionResult AddProduct(Dtos.Product product)
        {
            try{
                var result = _productServices.AddProductAsync(product);
                return Ok(result);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpPut("UpdateProduct")]
        public IActionResult UpdateProduct(Dtos.Product product)
        {
            try{
                var result = _productServices.UpdateProductAsync(product);
                return Ok(result);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpDelete("DeleteProduct/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            try{
                var result = _productServices.DeleteProductAsync(id);
                return Ok(result);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }
    }
}
