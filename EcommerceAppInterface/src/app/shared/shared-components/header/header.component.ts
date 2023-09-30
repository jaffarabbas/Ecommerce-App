import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/core/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  public isLoggedIn:boolean = false;
  constructor(
    private localStorageService:LocalStorageService,
    private toastr: ToastrService,
    private router:Router) {}
  ngOnInit(): void {
    this.isLoggedIn = this.localStorageService.getItem("token") ? true : false;
  }

  public logout(){
    if(window.confirm("Do you want to logout ?")){
      this.localStorageService.removeItem("token");
      this.isLoggedIn = false;
      this.router.navigate(["/"]);
      this.toastr.success("Logout Successfully");
    }
  }
}
