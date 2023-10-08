import { Component } from '@angular/core';
import {SideMenuService} from "../../../services/core/side-menu.service";

@Component({
  selector: 'app-admin-sidenav-list',
  templateUrl: './admin-sidenav-list.component.html',
  styleUrls: ['./admin-sidenav-list.component.scss']
})
export class AdminSidenavListComponent {
  constructor(public sideMenuService:SideMenuService) {
  }
}
