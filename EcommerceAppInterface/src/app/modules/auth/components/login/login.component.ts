import { Component, Input } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorMessageService} from "../../../../services/core/error-message.service";
import {ErrorMessages} from "../../../../utilities/constants/errorMessages";
import {FormErrorMessage} from "../../../../interfaces/formErrorMessage";
import { UserHandlerService } from 'src/app/services/apiHandler/user-handler.service';
import { User } from 'src/app/models/users';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/core/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Input() isShowBanner: boolean = true;
  spinner:boolean = false;

  constructor(
    public errorMessageService:ErrorMessageService,
    private localStorageService:LocalStorageService,
    private userApiHandlerServices:UserHandlerService,
    private router:Router,
    private toastr: ToastrService) {
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

  submit(){
    this.errorMessageService.checkFormValidation(this.formGroup);
    if(this.errorMessageService.isFormValidate){
      let user = {
        email:this.formGroup.value.email,
        password:this.formGroup.value.password
      }
      this.spinner = true;
      this.userApiHandlerServices.login(user as User).subscribe((res:any)=>{
        // this.formGroup.reset();
        this.spinner = false;
        if(res["Message"] == "Success"){
          console.log(res["Data"]);
          this.localStorageService.setItem("token",res["Data"]);
          this.router.navigate(["/"]);
          this.toastr.success("Login Successfully");
        }else{
          this.toastr.error(res["Data"]["message"]);
        }
      });
    }
  }
}
