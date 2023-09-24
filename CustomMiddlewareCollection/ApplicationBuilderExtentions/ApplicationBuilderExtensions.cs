using CustomMiddlewareCollection.GlobalExceptionHandler.Confriguations;
using CustomMiddlewareCollection.ValidateTokenMiddleware.Confriguations;
using Microsoft.AspNetCore.Builder;

namespace CustomMiddlewareCollection.ApplicationBuilderExtentions
{
    public static class ApplicationBuilderExtensions
    {
        /// <summary>
        /// Custom Error Handler Middleware
        /// </summary>
        /// <param name="applicationBuilder"></param>
        /// <returns></returns>
        public static IApplicationBuilder UseGlobalErrorHandler(this IApplicationBuilder applicationBuilder)
            => applicationBuilder.UseMiddleware<GlobalExceptionsHandlingMiddleware>();

        /// <summary>
        /// Custom Token Validator
        /// </summary>
        /// <param name="applicationBuilder"></param>
        /// <returns></returns>
        public static IApplicationBuilder UseValidateTokenHandler(this IApplicationBuilder applicationBuilder,string _authKey)
            => applicationBuilder.UseMiddleware<ValidateJWTTokenMiddleware>(_authKey);
    }
}
