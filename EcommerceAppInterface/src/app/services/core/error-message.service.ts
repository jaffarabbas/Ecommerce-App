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
  _errorMessageList:any[] = [];

  //filter error messages from errorMessages list and return global error message list
  private generateErrorMessage(errorMessages: FormErrorMessage[]){
    this._errorMessageList = [...errorMessages.map((errorMessage: FormErrorMessage) => {
      return ErrorMessages.errorMessages.find((error) => {
        return error.controlName === errorMessage.name && error.errorName === errorMessage.error;
      });
    })];
  }

  //get form validation and return error messages
  public checkFormValidation(formGroup: FormGroup){
    this._error = [];
    Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup?.get(field)!;
    //check if control has errors
      if(control.errors){
        this.isFormValidate = false;
        Object.keys(control.errors).forEach(keyError => {
          this._error.push({
            name: field,
            error: keyError,
          });
        });
        //filter error messages from global errorMessages list
        this.generateErrorMessage(this._error);
      }else{
        this.isFormValidate = true;
      }
    });

    console.log(this.error('email'));
    console.log(this.error('password'));
  }

  //return error message from filtered global error message list by control name
  public error(control:string) {
    return this._errorMessageList.find((error) => {
      return error.controlName === control;
    })?.message;
  }
}
