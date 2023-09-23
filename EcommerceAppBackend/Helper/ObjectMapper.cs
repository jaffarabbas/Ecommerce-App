using EcommerceAppBackend.Models;

namespace EcommerceAppBackend.Helper
{
    public class ObjectMapper : AutoMapper.Profile
    {
        public ObjectMapper()
        {
            CreateMap<Category, Dtos.Category>().ReverseMap();
            CreateMap<User, Dtos.User>().ReverseMap();
            CreateMap<Product, Dtos.Product>().ReverseMap();
            CreateMap<Admin, Dtos.Admin>().ReverseMap();
            CreateMap<AccountType, Dtos.AccountType>().ReverseMap();
            CreateMap<Contact, Dtos.Contact>().ReverseMap();
            CreateMap<TempUserOrder, Dtos.TempUserOrder>().ReverseMap();
            CreateMap<UserOrder, Dtos.UserOrder>().ReverseMap();
            CreateMap<Setting, Dtos.Setting>().ReverseMap();
        }
    }
}
