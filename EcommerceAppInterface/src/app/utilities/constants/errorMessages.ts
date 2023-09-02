import {EMControlNameList} from "../../interfaces/EMControlNameList";

export class ErrorMessages{
  public static errorMessages = [
    {
      controlName: "email",
      errorName: "required",
      message: "Email is required",
    },
    {
      controlName: "email",
      errorName: "email",
      message: "Email is invalid",
    }
  ]
}
