import { Component, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorMessageService} from "../../../../services/core/error-message.service";
import {DropdownItems} from "../../../../interfaces/dropDownItems";
import { AccountTypeHandlerService } from 'src/app/services/apiHandler/account-type-handler.service';
import { User } from 'src/app/models/users';
import { UserHandlerService } from 'src/app/services/apiHandler/user-handler.service';
import { LocalStorageService } from 'src/app/services/core/local-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  @Input() isShowBanner: boolean = true;
  spinner:boolean = false;
  accType!:DropdownItems[];

  constructor(
    public errorMessageService:ErrorMessageService,
    private userHandlerService:UserHandlerService,
    private localStorageService:LocalStorageService,
    private router:Router,
    private toastr: ToastrService,
    private accountTypeHandlerService:AccountTypeHandlerService) {
  }

  ngOnInit(): void {
    this.fillAccountType();
  }

  fillAccountType(){
    this.accountTypeHandlerService.getAll().subscribe((res:any)=>{
      this.accType = res["Data"].map((item:any)=>{
        return {
          id:item["Id"],
          name:item["Name"]
        };
      });
    });
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
      let user = {
        email : this.formGroup.value.email,
        firstname : this.formGroup.value.firstName,
        lastname : this.formGroup.value.lastName,
        password : this.formGroup.value.password,
        acid : this.formGroup.value.accountType
      };
      this.spinner = true;
      this.userHandlerService.register(user as User).subscribe((res:any)=>{
        if(res["Message"] == "Success"){
          this.loginAfterSubmit(this.formGroup);
        }else{
          this.toastr.error(res["Data"]["message"]);
        }
      });
    }
  }

  loginAfterSubmit(formGroup:FormGroup){
    let user = {
      email:this.formGroup.value.email,
      password:this.formGroup.value.password
    }
    this.userHandlerService.login(user as User).subscribe((res:any)=>{
      this.spinner = false;
      if(res["Message"] == "Success"){
        this.formGroup.reset();
        this.localStorageService.setItem("user",res["Data"]["User"]);
        this.localStorageService.setItem("token",res["Data"]["Token"]);
        this.router.navigate(["/"]);
        this.toastr.success("Welcome "+res["Data"]["User"]["Firstname"]+" "+res["Data"]["User"]["Lastname"]+"!");
        this.toastr.success("Register Successfully");
      }else{
        this.toastr.error(res["Data"]["message"]);
      }
    });
  }
}
