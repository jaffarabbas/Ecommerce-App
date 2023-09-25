using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using CustomMiddlewareCollection.GlobalExceptionHandler.Exceptions;
using EcommerceAppBackend.Dtos;
using EcommerceAppBackend.Models;
using EcommerceAppBackend.Repositories;
using EcommerceAppBackend.Services.UsersServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TRACKIT_BACKEND_API.Dtos;

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
                Expires = DateTime.Now.AddMinutes(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenkey
                ), SecurityAlgorithms.HmacSha256)
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
                var _user = await this._context.Users.FirstOrDefaultAsync(data => data.Email == authenticate.Email);
                if (_user == null)
                {
                    throw new UnAuthorizedAccessException("Invalid Email");
                }
                else if(_user != null && _user.Password != authenticate.Password)
                {
                    throw new UnAuthorizedAccessException("Invalid Password");
                }
                else
                {
                    var responce = GenerateToken(_user!);
                    return Ok(responce);
                }
            }
            catch (Exception error)
            {
                throw new BadRequestException(error.Message);
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
                    throw new UnAuthorizedAccessException("Invalid Token");
                }
                var userId = Convert.ToInt32(principle.Identity?.Name);
                var _reftable = _context.RefreshTokens.FirstOrDefault(data => data.Ruid == userId && data.RefreshToken1 == response.RefreshToken);
                if (_reftable == null)
                {
                    throw new UnAuthorizedAccessException("Invalid Token");
                }
                TokenResponse _result = Authenticate(userId, principle.Claims.ToArray());
                return Ok(_result);
            } catch (Exception error)
            {
                throw new BadRequestException(error.Message);
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
                return Ok(_users);
            }
            catch (Exception error)
            {
                throw new BadRequestException(error.Message);
            }
        }

        [HttpGet("GetUserById")]
        public async Task<IActionResult> GetUserById(int id)
        {
            try
            {
                var _user = await this._userServices.GetUserById(id);
                return Ok(_user);
            }
            catch (Exception error)
            {
                throw new BadRequestException(error.Message);
            }
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] Dtos.User user)
        {
            try
            {
                var _user = await this._userServices.Register(user);
                return Ok(_user);
            }
            catch (Exception error)
            {
                throw new BadRequestException(error.Message);
            }
        }

        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] Dtos.User user)
        {
            try
            {
                var _user = await this._userServices.UpdateUser(user);
                return Ok(_user);
            }
            catch (Exception error)
            {
                throw new BadRequestException(error.Message);
            }
        }

        [HttpDelete("DeleteUser")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var _user = await this._userServices.DeleteUser(id);
                return Ok(_user);
            }
            catch (Exception error)
            {
                throw new BadRequestException(error.Message);
            }
        }

        #endregion
    }
}
