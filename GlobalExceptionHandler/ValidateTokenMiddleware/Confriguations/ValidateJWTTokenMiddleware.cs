using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnAuthorizedAccessException = CustomMiddlewareCollection.GlobalExceptionHandler.Exceptions.UnAuthorizedAccessException;

namespace CustomMiddlewareCollection.ValidateTokenMiddleware.Confriguations
{
    public class ValidateJWTTokenMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string _authkey;

        public ValidateJWTTokenMiddleware(RequestDelegate next, string authkey)
        {
            _next = next;
            _authkey = authkey;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Perform token validation logic here
            if (!IsValidToken(context))
            {
                context.Response.StatusCode = 401; // Unauthorized status code
                context.Response.ContentType = "application/json";

                // Create a custom response message
                var responseMessage = new
                {
                    Message = "Invalid token."
                };
                // Serialize the response message to JSON
                var jsonResponse = Newtonsoft.Json.JsonConvert.SerializeObject(responseMessage);

                // Write the JSON response to the HTTP response stream
                await context.Response.WriteAsync(jsonResponse);

                return; // Exit the middleware
            }

            // Continue processing the request if the token is valid
            await _next(context);
        }

        private bool IsValidToken(HttpContext context)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var authorizationHeader = context.Request.Headers["Authorization"].ToString();

            // Check if the "Authorization" header is present and starts with "Bearer "
            if (string.IsNullOrWhiteSpace(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
            {
                if (context.Request.Path.StartsWithSegments("/api/Users")) // Adjust the path as needed
                {
                    return true; // Allow access to UserController without a token
                }
                return false; // Token is missing or in an invalid format
            }

            // Extract the token from the header
            var token = authorizationHeader.Substring("Bearer ".Length);

            var authkey = _authkey; // Replace with your actual secret key used for token generation

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authkey)),
                ValidateIssuer = false,
                ValidateAudience = false
            };

            try
            {
                SecurityToken securityToken;
                var claimsPrincipal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
                // The token is valid; you can also inspect claimsPrincipal if needed
                return true;
            }
            catch (Exception)
            {
                throw new UnAuthorizedAccessException("Invalid Token");
            }
        }
    }
}
