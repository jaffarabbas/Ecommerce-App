import { environment } from "src/environments/environment";

export class ApiUrls{
  public static API_URL = environment.apiUrl;
  public static API_CONTROLLERS = {
    Users: "Users",
  };
  public static API_END_POINTS = {
    Authenticate: "Authenticate",
    Register: "Register",
    GetAllUsers: "GetAllUsers",
  };

  public static apiEndPointWithId(endPoint:any,id:any): string {
    return endPoint + "/" + id;
  }

  public static apiEndPointWithTwoId(endPoint:any,id:any,id2:any): string {
    return endPoint + "/" + id + "/" + id2;
  }
}
