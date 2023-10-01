import { Component, Input } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorMessageService} from "../../../../services/core/error-message.service";
import { UserHandlerService } from 'src/app/services/apiHandler/user-handler.service';
import { User } from 'src/app/models/users';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/core/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Input() isShowBanner: boolean = true;
  spinner: boolean = false;

  constructor(
    public errorMessageService: ErrorMessageService,
    private localStorageService: LocalStorageService,
    private userApiHandlerServices: UserHandlerService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  init(res: any) {
    this.formGroup.reset();
    this.localStorageService.setItem('user', res['Data']['User']);
    this.localStorageService.setItem('token', res['Data']['Token']);
    this.router.navigate(['/']);
    this.toastr.success(
      'Welcome ' +
        res['Data']['User']['Firstname'] +
        ' ' +
        res['Data']['User']['Lastname'] +
        '!'
    );
    this.toastr.success('Login Successfully');
  }
  submit() {
    this.errorMessageService.checkFormValidation(this.formGroup);
    if (this.errorMessageService.isFormValidate) {
      let user = {
        email: this.formGroup.value.email,
        password: this.formGroup.value.password,
      };
      this.spinner = true;
      this.userApiHandlerServices.login(user as User).subscribe((res: any) => {
        this.spinner = false;
        if (res['Message'] == 'Success') {
          this.init(res);
        } else {
          this.toastr.error(res['Data']['message']);
        }
      });
    }
  }
}
