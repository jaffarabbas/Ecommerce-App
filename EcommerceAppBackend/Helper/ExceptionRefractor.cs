using TRACKIT_BACKEND_API.Dtos;

namespace EcommerceAppBackend.Helper;

public class ExceptionRefractor
{
    public static ExceptionMessage ExceptionMessage(Exception exception)
    {
        return new ExceptionMessage()
        {
            message = exception.Message,
        };
    }
}