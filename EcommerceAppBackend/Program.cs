using AutoMapper;
using CustomMiddlewareCollection.ApplicationBuilderExtentions;
using EcommerceAppBackend.Dtos;
using EcommerceAppBackend.Helper;
using EcommerceAppBackend.Models;
using EcommerceAppBackend.Repositories;
using EcommerceAppBackend.Services.AdminServices;
using EcommerceAppBackend.Services.CategoriesServices;
using EcommerceAppBackend.Services.ProductServices;
using EcommerceAppBackend.Services.TempUserOrderServices;
using EcommerceAppBackend.Services.UserOrderServices;
using EcommerceAppBackend.Services.UsersServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

#region Packages Working

#region database initialization

// database configuration
builder.Services.AddDbContext<JewelSiteDBContext>(options =>
{

    options.UseSqlServer(builder.Configuration.GetConnectionString("connection"));
    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
});

#endregion 

#region services dependency injection initialization

//add services dependency injection
builder.Services.AddTransient<ICategroiesService, CategoriesService>();
builder.Services.AddTransient<IUserServices, UserServices>();
builder.Services.AddTransient<IRefreshTokenGenerator, RefreshTokenGenerator>();
builder.Services.AddTransient<IAdminServices, AdminServices>();
builder.Services.AddTransient<IProductServices, ProductServices>();
builder.Services.AddTransient<ITempUserOrderServices,TempUserOrderServices>();
builder.Services.AddTransient<IUserOrderServices,UserOrderServices>();
builder.Services.AddTransient<IAdminServices,AdminServices>();
#endregion 

#region JWT initialization

//jwt
var _jwtSettng = builder.Configuration.GetSection("JWTSetting");
builder.Services.Configure<JWTSetting>(_jwtSettng);
var authkey = builder.Configuration.GetValue<string>("JWTSetting:securitykey");


//jwt initializing
builder.Services.AddAuthentication(item =>
{
    item.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    item.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = true;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authkey.ToString())),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});


#endregion

#region automapper initialization

//automapper 

var automapper = new MapperConfiguration(item => item.AddProfile(new ObjectMapper()));
IMapper mapper = automapper.CreateMapper();
builder.Services.AddSingleton(mapper);


#endregion

#region cors initialization

//cors
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

#endregion

#region json serializar initialization

JsonConvert.DefaultSettings = () => new JsonSerializerSettings
{
    Formatting = Newtonsoft.Json.Formatting.Indented,
    ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
};

#endregion

#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();
//custom error handler middleware
app.UseGlobalErrorHandler();
app.UseValidateTokenHandler(builder.Configuration?.GetSection("JWTSetting")?.GetValue<string>("securitykey")!);

app.MapControllers();

app.Run();
