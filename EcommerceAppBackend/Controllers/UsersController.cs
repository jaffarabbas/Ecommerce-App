using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using CustomMiddlewareCollection.GlobalExceptionHandler.Exceptions;
using CustomMiddlewareCollection.GlobalExceptionHandlerMiddleware.Exceptions;
using EcommerceAppBackend.Constants;
using EcommerceAppBackend.Dtos;
using EcommerceAppBackend.Helper;
using EcommerceAppBackend.Models;
using EcommerceAppBackend.Repositories;
using EcommerceAppBackend.Services.UsersServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TRACKIT_BACKEND_API.Dtos;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace EcommerceAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserServices _userServices;
        private readonly JWTSetting _setting;
        private readonly IRefreshTokenGenerator _refreshTokenGenerator;
        private readonly JewelSiteDBContext _context;
        public UsersController(JewelSiteDBContext context, IUserServices userRepository, IOptions<JWTSetting> settings, IRefreshTokenGenerator refreshTokenGenerator)
        {
            this._userServices = userRepository;
            this._setting = settings.Value;
            this._refreshTokenGenerator = refreshTokenGenerator;
            this._context = context;
        }
        private TokenResponse tokenResponce;

        #region Token Authentication and Generation

        [NonAction]
        public TokenResponse Authenticate(int uuid, Claim[] claims)
        {
            tokenResponce = new TokenResponse();
            var tokenkey = Encoding.UTF8.GetBytes(_setting.securitykey);
            var tokenHandler = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(2),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(tokenkey), SecurityAlgorithms.HmacSha256)
                );
            tokenResponce.JWTToken = new JwtSecurityTokenHandler().WriteToken(tokenHandler);
            tokenResponce.RefreshToken = _refreshTokenGenerator.GenerateToken(uuid);
            return tokenResponce;
        }

        [NonAction]
        private TokenResponse GenerateToken(Models.User pUser)
        {
            tokenResponce = new TokenResponse();
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenkey = Encoding.UTF8.GetBytes(this._setting.securitykey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.Name,pUser.Uid.ToString()),
                    }
                ),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenkey), SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            string finaltoken = tokenHandler.WriteToken(token);
            tokenResponce.JWTToken = finaltoken;
            tokenResponce.RefreshToken = _refreshTokenGenerator.GenerateToken(pUser.Uid);
            return tokenResponce;
        }

        [Route("Authenticate")]
        [HttpPost]
        public async Task<IActionResult> Authenticate([FromBody] Authenticate authenticate)
        {
            try
            {
                var _user = await _context.Users.FirstOrDefaultAsync(data => data.Email == authenticate.Email && data.Password == authenticate.Password);
                if (_user == null)
                {
                    return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(new UnAuthorizedAccessException("Invalid Credentials")), ApiResponseMessages.Error, ApiStatusCodes.Unauthorized);
                }
                else
                {
                    var responce = GenerateToken(_user!);
                    var userTokenResponse = new UserTokenResponse()
                    {
                        User = _user,
                        Token = responce
                    };
                    return new ApiHitResponse(userTokenResponse, ApiResponseMessages.success, ApiStatusCodes.OK);
                }
            }
            catch (Exception error)
            {
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(error), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        [Route("Refresh")]
        [HttpPost]
        public IActionResult Refresh([FromBody] TokenResponse response)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                SecurityToken securityToken;
                var principle = tokenHandler.ValidateToken(response.JWTToken, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_setting.securitykey)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                }, out securityToken);
                var _token = securityToken as JwtSecurityToken;

                if (_token != null && !_token.Header.Alg.Equals(SecurityAlgorithms.HmacSha256))
                {
                    return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(new UnAuthorizedAccessException("Invalid Token")), ApiResponseMessages.Error, ApiStatusCodes.Unauthorized);
                }
                var userId = Convert.ToInt32(principle.Identity?.Name);
                var _reftable = _context.RefreshTokens.FirstOrDefault(data => data.Ruid == userId && data.RefreshToken1 == response.RefreshToken);
                if (_reftable == null)
                {
                     return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(new UnAuthorizedAccessException("Invalid Token")), ApiResponseMessages.Error, ApiStatusCodes.Unauthorized);
                }
                TokenResponse _result = Authenticate(userId, principle.Claims.ToArray());
                return new ApiHitResponse(_result, ApiResponseMessages.success, ApiStatusCodes.OK);
            } catch (Exception error)
            {
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(error), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }


        #endregion

        #region crud for user

        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var _users = await this._userServices.GetAllUsers();
                return new ApiHitResponse(_users, ApiResponseMessages.success, ApiStatusCodes.OK);
            }
            catch (Exception error)
            {
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(error), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        [HttpGet("GetUserById")]
        public async Task<IActionResult> GetUserById(int id)
        {
            try
            {
                var _user = await this._userServices.GetUserById(id);
                return new ApiHitResponse(_user, ApiResponseMessages.success, ApiStatusCodes.OK);
            }
            catch (Exception error)
            {
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(error), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] Dtos.User user)
        {
            try
            {
                var checkUserExist = await _userServices.CheckUserExist(user);
                if (!checkUserExist)
                {
                    var _user = await this._userServices.Register(user);
                    return new ApiHitResponse(_user, ApiResponseMessages.success, ApiStatusCodes.OK);
                }
                else
                {
                    return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(new UserAlreadyExistsException("Email Already Exists!")), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
                }
            }
            catch (Exception error)
            {
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(error), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] Dtos.User user)
        {
            try
            {
                var _user = await this._userServices.UpdateUser(user);
                return new ApiHitResponse(_user, ApiResponseMessages.success, ApiStatusCodes.OK);
            }
            catch (Exception error)
            {
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(error), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        [HttpDelete("DeleteUser")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var _user = await this._userServices.DeleteUser(id);
                return new ApiHitResponse(_user, ApiResponseMessages.success, ApiStatusCodes.OK);
            }
            catch (Exception error)
            {
                return new ApiHitResponse(ExceptionRefractor.ExceptionMessage(error), ApiResponseMessages.Error, ApiStatusCodes.InternalServerError);
            }
        }

        #endregion
    }
}
