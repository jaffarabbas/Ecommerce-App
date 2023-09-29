﻿namespace TRACKIT_BACKEND_API.Dtos
{
    public class ApiResponse<T>
    {
        public string StatusCode { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
    }
}
