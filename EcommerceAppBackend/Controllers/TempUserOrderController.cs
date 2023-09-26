using CustomMiddlewareCollection.GlobalExceptionHandler.Exceptions;
using EcommerceAppBackend.Services.TempUserOrderServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TempUserOrderController : ControllerBase
    {
        private readonly ITempUserOrderServices _tempUserOrderServices;

        public TempUserOrderController(ITempUserOrderServices tempUserOrderServices)
        {
            _tempUserOrderServices = tempUserOrderServices;
        }

        [HttpGet("GetTempUserOrders")]
        public async Task<IActionResult> GetTempUserOrders()
        {
            try{
                var tempUserOrders = await _tempUserOrderServices.GetTempUserOrder();
                return Ok(tempUserOrders);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpGet("GetTempUserOrder/{id}")]
        public async Task<IActionResult> GetTempUserOrder(int id)
        {
            try{
                var tempUserOrder = await _tempUserOrderServices.GetTempUserOrderAsync(id);
                return Ok(tempUserOrder);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpPost("AddTempUserOrder")]
        public async Task<IActionResult> AddTempUserOrder(Dtos.TempUserOrder tempUserOrder)
        {
            try{
                var result = await _tempUserOrderServices.AddTempOrderAsync(tempUserOrder);
                return Ok(result);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpPut("UpdateTempUserOrder")]
        public async Task<IActionResult> UpdateTempUserOrder(Dtos.TempUserOrder tempUserOrder)
        {
            try{
                var result = await _tempUserOrderServices.UpdateTempUserOrderAsync(tempUserOrder);
                return Ok(result);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpDelete("DeleteTempUserOrder/{id}")]
        public async Task<IActionResult> DeleteTempUserOrder(int id)
        {
            try{
                var result = await _tempUserOrderServices.DeleteTempUserOrderAsync(id);
                return Ok(result);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }
    }
}
