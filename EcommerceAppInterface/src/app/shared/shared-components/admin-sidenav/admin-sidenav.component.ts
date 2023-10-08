import {Component, ViewChild} from '@angular/core';
import {SideMenuService} from "../../../services/core/side-menu.service";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss'],
})
export class AdminSidenavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  constructor(public sideMenuService:SideMenuService) {
  }
}
