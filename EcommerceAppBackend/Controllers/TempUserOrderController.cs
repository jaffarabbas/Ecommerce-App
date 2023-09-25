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
        public IActionResult GetTempUserOrders()
        {
            try{
                var tempUserOrders = _tempUserOrderServices.GetTempUserOrder();
                return Ok(tempUserOrders);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpGet("GetTempUserOrder/{id}")]
        public IActionResult GetTempUserOrder(int id)
        {
            try{
                var tempUserOrder = _tempUserOrderServices.GetTempUserOrderAsync(id);
                return Ok(tempUserOrder);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpPost("AddTempUserOrder")]
        public IActionResult AddTempUserOrder(Dtos.TempUserOrder tempUserOrder)
        {
            try{
                var result = _tempUserOrderServices.AddTempOrderAsync(tempUserOrder);
                return Ok(result);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpPut("UpdateTempUserOrder")]
        public IActionResult UpdateTempUserOrder(Dtos.TempUserOrder tempUserOrder)
        {
            try{
                var result = _tempUserOrderServices.UpdateTempUserOrderAsync(tempUserOrder);
                return Ok(result);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpDelete("DeleteTempUserOrder/{id}")]
        public IActionResult DeleteTempUserOrder(int id)
        {
            try{
                var result = _tempUserOrderServices.DeleteTempUserOrderAsync(id);
                return Ok(result);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }
    }
}
