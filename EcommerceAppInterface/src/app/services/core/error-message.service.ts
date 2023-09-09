import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormErrorMessage} from "../../interfaces/formErrorMessage";
import {ErrorMessages} from "../../utilities/constants/errorMessages";

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  isFormValidate:boolean = false;
  _error:FormErrorMessage[] = [];
  // _errorMessageList:any[] = [];
  // errorMessage:string = "";

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
    //check if control has errors
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
    });
  }
   passwordMatchValidator(control: FormGroup) {
    const password = control?.get('password')!.value;
    const confirmPassword = control?.get('confirmPassword')!.value;
    if(password != null && confirmPassword != null){
      if (password !== confirmPassword) {
        control?.get('confirmPassword')!.setErrors({ notMatch: true }); // Set the error explicitly for confirmPassword control
      } else {
        control?.get('confirmPassword')!.setErrors(null); // Clear the error if passwords match
      }
    }
    return null;
  }

  private confirmPasswordValidation(formGroup: FormGroup){
    console.log('asdasd')
    if(formGroup.get("password")?.value != formGroup.get("confirmPassword")?.value){
      this._error.push({
        name: "confirmPassword",
        error: "notMatch",
      });
      this.isFormValidate = false;
      console.log(this._error)
    }
  }

  //return error message from filtered global error message list by control name
  public error(control:string){
    return this.generateErrorMessage(this._error).find((error) => {
      return error?.controlName === control;
    })?.message;
  }
}
