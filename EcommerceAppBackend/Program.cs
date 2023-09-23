using AutoMapper;
using EcommerceAppBackend.Dtos;
using EcommerceAppBackend.Helper;
using EcommerceAppBackend.Models;
using EcommerceAppBackend.Services.ProductServices;
using GlobalErrorHandling.Confriguations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// database configuration
builder.Services.AddDbContext<JewelSiteDBContext>(options =>
{

    options.UseSqlServer(builder.Configuration.GetConnectionString("connection"));
    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
});

//add services dependency injection
builder.Services.AddTransient<ICategroiesService, CategoriesService>();

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


//automapper 

var automapper = new MapperConfiguration(item => item.AddProfile(new ObjectMapper()));
IMapper mapper = automapper.CreateMapper();
builder.Services.AddSingleton(mapper);

// builder.Services.AddControllers().AddNewtonsoftJson();
//
JsonConvert.DefaultSettings = () => new JsonSerializerSettings
{
    Formatting = Newtonsoft.Json.Formatting.Indented,
    ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
};

//cors
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//custom error handler middleware
app.UseGlobalErrorHandler();

app.Run();
