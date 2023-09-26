using CustomMiddlewareCollection.GlobalExceptionHandler.Exceptions;
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
                return Ok(accountTypes);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpGet("GetAccountType/{id}")]
        public async Task<IActionResult> GetAccountType(int id)
        {
            try{
                var accountType = await _accountTypeServices.GetAccountTypeAsync(id);
                return Ok(accountType);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpPost("AddAccountType")]
        public async Task<IActionResult> AddAccountType(Dtos.AccountType accountType)
        {
            try{
                var result = await _accountTypeServices.AddAccountTypeAsync(accountType);
                return Ok(result);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpPut("UpdateAccountType")]
        public IActionResult UpdateAccountType(Dtos.AccountType accountType)
        {
            try{
                var result = _accountTypeServices.UpdateAccountTypeAsync(accountType);
                return Ok(result);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpDelete("DeleteAccountType/{id}")]
        public async Task<IActionResult> DeleteAccountType(int id)
        {
            try{
                var result = await _accountTypeServices.DeleteAccountTypeAsync(id);
                return Ok(result);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }
    }
}
