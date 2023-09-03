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
    }
  ]
}
