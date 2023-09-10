import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormErrorMessage} from "../../interfaces/formErrorMessage";
import {ErrorMessages} from "../../utilities/constants/errorMessages";

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  isFormValidate:boolean = true;
  _error:FormErrorMessage[] = [];

  //filter error messages from errorMessages list and return global error message list
  private generateErrorMessage(errorMessages: FormErrorMessage[]){
    return errorMessages.map((errorMessage: FormErrorMessage) => {
      return ErrorMessages.errorMessages.find((error) => {
        return error.controlName === errorMessage.name && error.errorName === errorMessage.error;
      });
    });
  }

  //get form validation and return error messages
  public checkFormValidation(formGroup: FormGroup){
    this._error = [];
    formGroup.invalid ? this.isFormValidate = false : this.isFormValidate = true;
    Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup?.get(field)!;
      if(control.errors){
        console.log(control.errors)
        console.log(field)
        Object.keys(control.errors).forEach(keyError => {
          this._error.push({
            name: field,
            error: keyError,
          });
        });
        this.isFormValidate = false;
      }
      this.validateConfirmPassword(formGroup);
    });
  }

  private validateConfirmPassword(formGroup: FormGroup){
    if(formGroup.controls["password"].value !== formGroup.controls["confirmPassword"].value){
      this._error.push({
        name: "confirmPassword",
        error: "notMatch",
      });
      this.isFormValidate = false;
    }
  }

  //return error message from filtered global error message list by control name
  public error(control:string){
    return this.generateErrorMessage(this._error).find((error) => {
      return error?.controlName === control;
    })?.message;
  }
}
