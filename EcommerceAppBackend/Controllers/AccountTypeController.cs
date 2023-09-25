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
        public IActionResult GetAccountTypes()
        {
            try{
                var accountTypes = _accountTypeServices.GetAccountTypesAsync();
                return Ok(accountTypes);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpGet("GetAccountType/{id}")]
        public IActionResult GetAccountType(int id)
        {
            try{
                var accountType = _accountTypeServices.GetAccountTypeAsync(id);
                return Ok(accountType);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }

        [HttpPost("AddAccountType")]
        public IActionResult AddAccountType(Dtos.AccountType accountType)
        {
            try{
                var result = _accountTypeServices.AddAccountTypeAsync(accountType);
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
        public IActionResult DeleteAccountType(int id)
        {
            try{
                var result = _accountTypeServices.DeleteAccountTypeAsync(id);
                return Ok(result);
            }catch(Exception ex){
                throw new BadRequestException(ex.Message);
            }
        }
    }
}
