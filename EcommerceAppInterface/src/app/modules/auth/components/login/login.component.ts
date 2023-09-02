import { Component, Input } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorMessageService} from "../../../../services/core/error-message.service";
import {ErrorMessages} from "../../../../utilities/constants/errorMessages";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Input() isShowBanner: boolean = true;
  submitted: boolean = false;

  constructor(public errorHandler:ErrorMessageService) {
  }

  formGroup:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  submit(){
    this.submitted = true;
    if(this.formGroup.valid){
      console.log(this.formGroup.value);
    }
  }

  protected readonly ErrorMessages = ErrorMessages;
}
