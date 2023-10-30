import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/core/local-storage.service';

@Component({
  selector: 'app-admin-header-dropdown',
  templateUrl: './admin-header-dropdown.component.html',
  styleUrls: ['./admin-header-dropdown.component.scss']
})
export class AdminHeaderDropdownComponent {
  constructor(private localStorageServices:LocalStorageService,private router:Router){}
  logout(){
    this.localStorageServices.removeItem('adminToken');
    this.localStorageServices.removeItem('adminUser');
    if(window.confirm("DO you want to logout ?")){
      this.router.navigate(['/admin/login']);
    }
  }
}
