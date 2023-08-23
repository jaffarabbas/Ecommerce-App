import { Injectable } from '@angular/core';
import {FormErrorMessage} from "../../interfaces/formFeildsErrorMessage/formErrorMessage";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  private errorMessage!: string;
  public isErrorResolved: boolean = false;
  constructor() { }

  errorMessages(error:string):string{
    return error;
  }
  get getErrorMessage(): string {
    return this.errorMessage;
  }

  set setErrorMessage(errorMessage: string) {
    this.errorMessage = errorMessage;
  }

  getErrorMessageFromList(control:string,list:FormErrorMessage[]):string | null{
    return list.find((item) => item.name === control)?.error || null;
  }

  setErrorMessageList(formGroup:FormGroup,errorMessage:FormErrorMessage[]){
    for (let formControls in formGroup.controls) {
      if(formGroup.get(formControls)?.value == ""){
        this.isErrorResolved = false;
        errorMessage.push({name:formControls,error:"required"})
      }else if(formGroup.get(formControls)?.invalid) {
        this.isErrorResolved = false;
        //check form item if exist in error message list because of filled early
        let error = errorMessage.filter((item) => item.name === formControls);
        if(error.length > 0){
          error.forEach((item) => {
            item.error = "Invalid" || "";
          });
        }else{
          errorMessage.push({name:formControls,error:"Invalid"});
        }
      }else{
        this.isErrorResolved = true;
      }
    }
  }
}
