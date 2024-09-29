# Use the official .NET SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the solution file and project files
COPY *.sln ./
COPY EcommerceAppBackend/EcommerceAppBackend.csproj EcommerceAppBackend/
COPY CustomMiddlewareProject/CustomMiddlewareCollection.csproj CustomMiddlewareProject/

# Restore dependencies
RUN dotnet restore "EcommerceAppBackend/EcommerceAppBackend.csproj"

# Copy the remaining project files
COPY EcommerceAppBackend/ ./EcommerceAppBackend/
COPY CustomMiddlewareProject/ ./CustomMiddlewareProject/

# Build the application
RUN dotnet build "EcommerceAppBackend/EcommerceAppBackend.csproj" -c Release -o /app/build

# Publish the application
RUN dotnet publish "EcommerceAppBackend/EcommerceAppBackend.csproj" -c Release -o /app/publish

# Use the official .NET runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

# Set the working directory
WORKDIR /app

# Copy the published application from the build stage
COPY --from=build /app/publish .

# Expose the ports that the app runs on
EXPOSE 8080

# Set the entry point for the container
ENTRYPOINT ["dotnet", "EcommerceAppBackend.dll"]
