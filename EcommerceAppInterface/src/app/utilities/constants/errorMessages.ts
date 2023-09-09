import {EMControlNameList} from "../../interfaces/EMControlNameList";

export class ErrorMessages{
  public static errorMessages = [
    {
      controlName: "email",
      errorName: "required",
      message: "Email is required",
    },{
      controlName: "email",
      errorName: "email",
      message: "Email is invalid",
    },{
      controlName: "password",
      errorName: "required",
      message: "Password is required",
    },{
      controlName: "password",
      errorName: "minlength",
      message: "Password must be at least 8 characters",
    },{
      controlName: "confirmPassword",
      errorName: "required",
      message: "Confirm password is required",
    },{
      controlName: "confirmPassword",
      errorName: "notMatch",
      message: "Confirm password is not match",
    },{
      controlName: "firstName",
      errorName: "required",
      message: "First name is required",
    },{
      controlName: "lastName",
      errorName: "required",
      message: "Last name is required",
    },{
      controlName: "accountType",
      errorName: "required",
      message: "Account type is required",
    }
  ]
}
