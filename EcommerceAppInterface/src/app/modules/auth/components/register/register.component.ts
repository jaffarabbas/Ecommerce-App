import { Component, Input } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorMessageService} from "../../../../services/core/error-message.service";
import {DropdownItems} from "../../../../interfaces/dropDownItems";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Input() isShowBanner: boolean = true;

  accType:DropdownItems[] = [
    {id: 1, name: "Sliver"},
    {id: 2, name: "Gold"},
    {id: 3, name: "Platinum"},
  ];
  constructor(public errorMessageService:ErrorMessageService) {
  }

  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    firstName: new FormControl('', [
      Validators.required,
    ]),
    lastName: new FormControl('', [
      Validators.required,
    ]),
    accountType : new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('',[
      Validators.required,
    ]),
  });

  submit() {
    this.errorMessageService.checkFormValidation(this.formGroup);
    if(this.errorMessageService.isFormValidate){
      console.log(this.formGroup.value);
    }
  }
}
