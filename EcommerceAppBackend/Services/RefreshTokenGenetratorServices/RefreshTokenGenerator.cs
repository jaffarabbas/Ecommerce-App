using Azure;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using EcommerceAppBackend.Dtos;
using EcommerceAppBackend.Models;

namespace EcommerceAppBackend.Repositories
{
    public class RefreshTokenGenerator : IRefreshTokenGenerator
    {
       private readonly JewelSiteDBContext _context;
       public RefreshTokenGenerator(JewelSiteDBContext context)
       {
           _context = context;
       }

       public string GenerateToken(int uuid)
       {
           var randomnumber = new byte[32];
           using (var randomnumbergenerator = RandomNumberGenerator.Create())
           {
               randomnumbergenerator.GetBytes(randomnumber);
               string RefreashToken = Convert.ToBase64String(randomnumber);
               var _token = _context.RefreshTokens.FirstOrDefault(data => data.Ruid == uuid);
               if (_token != null)
               {
                    _token.RefreshToken1 = RefreashToken;
                   _context.RefreshTokens.Update(_token);
                   _context.SaveChanges();
               }
               else
               {
                   Models.RefreshToken tblRefreshtoken = new Models.RefreshToken
                   {
                       Ruid = uuid,
                       RefreshToken1 = RefreashToken
                   };
                   _context.RefreshTokens.Add(tblRefreshtoken);
                   _context.SaveChanges();
               }
               return RefreashToken;
           }
       }

    }
}
