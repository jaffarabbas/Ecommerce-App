import { Component, Input } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorMessageService} from "../../../../services/core/error-message.service";
import {ErrorMessages} from "../../../../utilities/constants/errorMessages";
import {FormErrorMessage} from "../../../../interfaces/formErrorMessage";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Input() isShowBanner: boolean = true;
  errorMessage:FormErrorMessage[] = [];
  spinner:boolean = false;
  constructor(public errorMessageService:ErrorMessageService) {
  }

  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  async submit(){
    this.errorMessageService.checkFormValidation(this.formGroup);
    if(this.errorMessageService.isFormValidate){
      console.log(this.formGroup.value);
    }
  }

  protected readonly ErrorMessages = ErrorMessages;
}
