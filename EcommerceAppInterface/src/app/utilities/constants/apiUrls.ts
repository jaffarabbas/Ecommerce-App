import { environment } from "src/environments/environment";

export class ApiUrls{
  public static API_URL = environment.apiUrl;
  public static API_CONTROLLERS = {
    Users: "Users",
    AccountTypes: "AccountType",
    Products:"Products",
    Categories:"Categories",
  };
  public static API_END_POINTS = {
    User:{
        Authenticate: "Authenticate",
        Register: "Register",
        GetAllUsers: "GetAllUsers",
    },
    AccountType: {
        GetAccountTypes: "GetAccountTypes",
    },
    Products:{
      GetProductByCid:"GetProductByCid",
      GetProduct:"GetProduct",
      AddProduct:"AddProduct",
      UpdateProduct:"UpdateProduct",
      DeleteProduct:"DeleteProduct"
    },
    Categories :{
      GetAllCategories:"GetAllCategories"
    }        
  };

  public static apiEndPointWithId(endPoint:any,id:any): string {
    return endPoint + "/" + id;
  }

  public static apiEndPointWithTwoId(endPoint:any,id:any,id2:any): string {
    return endPoint + "/" + id + "/" + id2;
  }
}
