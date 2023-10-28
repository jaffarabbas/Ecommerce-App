import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {SideMenuService} from "../../services/core/side-menu.service";
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isAdminLoggedIn!: boolean;

  constructor(public sideMenuService:SideMenuService,private route: Router) {
    this.checkParamHaveLogin();
  }

  checkParamHaveLogin(){
    const currentRoutePath = this.route.url;
    console.log(currentRoutePath);
    if (currentRoutePath === '/admin/login') {
      this.isAdminLoggedIn = false;
    } else {
      this.isAdminLoggedIn = true;
    }
    console.log(this.isAdminLoggedIn);
  }
}
