import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {SideMenuService} from "../../services/core/side-menu.service";
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { IsAdminLoggedInService } from 'src/app/services/core/is-admin-logged-in.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    public sideMenuService:SideMenuService,
    public IsAdminLoggedInService: IsAdminLoggedInService,
    private route: Router) {
    this.checkParamHaveLogin();
  }
  ngOnInit() {
    
  }
  checkParamHaveLogin(){
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.IsAdminLoggedInService.setFlag(!this.route.url.endsWith('/login'));
      }
    });
  }
}
