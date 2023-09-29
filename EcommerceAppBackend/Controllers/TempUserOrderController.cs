using CustomMiddlewareCollection.GlobalExceptionHandler.Exceptions;
using EcommerceAppBackend.Constants;
using EcommerceAppBackend.Helper;
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
                return new ApiHitResponse(tempUserOrders, ApiResponseMessages.success, ApiStatusCodes.OK);
            }catch(Exception ex){
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(ex), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        [HttpGet("GetTempUserOrder/{id}")]
        public async Task<IActionResult> GetTempUserOrder(int id)
        {
            try{
                var tempUserOrder = await _tempUserOrderServices.GetTempUserOrderAsync(id);
                return new ApiHitResponse(tempUserOrder, ApiResponseMessages.success, ApiStatusCodes.OK);
            }catch(Exception ex){
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(ex), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        [HttpPost("AddTempUserOrder")]
        public async Task<IActionResult> AddTempUserOrder(Dtos.TempUserOrder tempUserOrder)
        {
            try{
                var result = await _tempUserOrderServices.AddTempOrderAsync(tempUserOrder);
                return new ApiHitResponse(result, ApiResponseMessages.success, ApiStatusCodes.OK);
            }catch(Exception ex){
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(ex), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        [HttpPut("UpdateTempUserOrder")]
        public async Task<IActionResult> UpdateTempUserOrder(Dtos.TempUserOrder tempUserOrder)
        {
            try{
                var result = await _tempUserOrderServices.UpdateTempUserOrderAsync(tempUserOrder);
                return new ApiHitResponse(result, ApiResponseMessages.success, ApiStatusCodes.OK);
            }catch(Exception ex){
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(ex), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        [HttpDelete("DeleteTempUserOrder/{id}")]
        public async Task<IActionResult> DeleteTempUserOrder(int id)
        {
            try{
                var result = await _tempUserOrderServices.DeleteTempUserOrderAsync(id);
                return new ApiHitResponse(result, ApiResponseMessages.success, ApiStatusCodes.OK);
            }catch(Exception ex){
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(ex), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }
    }
}
