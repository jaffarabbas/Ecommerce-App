import {Component, Input, OnDestroy} from '@angular/core';
import {SideMenuService} from "../../../services/core/side-menu.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-admin-sidenav-items',
  templateUrl: './admin-sidenav-items.component.html',
  styleUrls: ['./admin-sidenav-items.component.scss'],
  providers:[SideMenuService]
})
export class AdminSidenavItemsComponent {
  @Input() icon!:string;
  @Input() label!:string;
  @Input() isActive!:boolean;
  constructor(public sideMenuService:SideMenuService,public router:Router) {

  }
}
