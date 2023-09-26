using CustomMiddlewareCollection.GlobalExceptionHandler.Exceptions;
using EcommerceAppBackend.Services.UserOrderServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserOrdersController : ControllerBase
    {
        private readonly IUserOrderServices _userOrderServices;

        public UserOrdersController(IUserOrderServices userOrderServices)
        {
            _userOrderServices = userOrderServices;
        }

        [HttpGet("GetUserOrders")]
        public async Task<IActionResult> GetUserOrders()
        {
            try{
                var userOrders = await _userOrderServices.GetAllOrdersAsync();
                return Ok(userOrders);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpGet("GetUserOrder/{id}")]
        public async Task<IActionResult> GetUserOrder(int id)
        {
            try{
                var userOrder = await _userOrderServices.GetOrderAsync(id);
                return Ok(userOrder);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpPost("AddUserOrder")]
        public async Task<IActionResult> AddUserOrder(Dtos.UserOrder userOrder)
        {
            try{
                var result = await _userOrderServices.AddOrderAsync(userOrder);
                return Ok(result);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpPut("UpdateUserOrder")]
        public async Task<IActionResult> UpdateUserOrder(Dtos.UserOrder userOrder)
        {
            try{
                var result = await _userOrderServices.UpdateOrderAsync(userOrder);
                return Ok(result);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpDelete("DeleteUserOrder/{id}")]
        public async Task<IActionResult> DeleteUserOrder(int id)
        {
            try{
                var result = await _userOrderServices.DeleteOrderAsync(id);
                return Ok(result);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }
    }
}
