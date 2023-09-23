using EcommerceAppBackend.Dtos;
using EcommerceAppBackend.Models;
using GlobalErrorHandling.Confriguations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// database configuration
builder.Services.AddDbContext<JewelSiteDBContext>(options =>
{

    options.UseSqlServer(builder.Configuration.GetConnectionString("connection"));
    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
});

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

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//custom error handler middleware
app.UseGlobalErrorHandler();

app.Run();
