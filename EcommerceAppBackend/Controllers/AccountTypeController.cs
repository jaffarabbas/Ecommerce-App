using CustomMiddlewareCollection.GlobalExceptionHandler.Exceptions;
using EcommerceAppBackend.Constants;
using EcommerceAppBackend.Helper;
using EcommerceAppBackend.Services.AccountTypeServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountTypeController : ControllerBase
    {
        private readonly IAccountTypeServices _accountTypeServices;

        public AccountTypeController(IAccountTypeServices accountTypeServices)
        {
            _accountTypeServices = accountTypeServices;
        }

        [HttpGet("GetAccountTypes")]
        public async Task<IActionResult> GetAccountTypes()
        {
            try{
                var accountTypes = await _accountTypeServices.GetAccountTypesAsync();
                return new ApiHitResponse(accountTypes, ApiResponseMessages.success, ApiStatusCodes.OK);
            }catch(Exception ex){
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(ex), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        [HttpGet("GetAccountType/{id}")]
        public async Task<IActionResult> GetAccountType(int id)
        {
            try{
                var accountType = await _accountTypeServices.GetAccountTypeAsync(id);
                return new ApiHitResponse(accountType, ApiResponseMessages.success, ApiStatusCodes.OK);
            }catch(Exception ex){
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(ex), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        [HttpPost("AddAccountType")]
        public async Task<IActionResult> AddAccountType(Dtos.AccountType accountType)
        {
            try{
                var result = await _accountTypeServices.AddAccountTypeAsync(accountType);
                return new ApiHitResponse(result, ApiResponseMessages.success, ApiStatusCodes.OK);
            }catch(Exception ex){
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(ex), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        [HttpPut("UpdateAccountType")]
        public IActionResult UpdateAccountType(Dtos.AccountType accountType)
        {
            try{
                var result = _accountTypeServices.UpdateAccountTypeAsync(accountType);
                return new ApiHitResponse(result, ApiResponseMessages.success, ApiStatusCodes.OK);
            }catch(Exception ex){
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(ex), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        [HttpDelete("DeleteAccountType/{id}")]
        public async Task<IActionResult> DeleteAccountType(int id)
        {
            try{
                var result = await _accountTypeServices.DeleteAccountTypeAsync(id);
                return new ApiHitResponse(result, ApiResponseMessages.success, ApiStatusCodes.OK);
            }catch(Exception ex){
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(ex), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }
    }
}
