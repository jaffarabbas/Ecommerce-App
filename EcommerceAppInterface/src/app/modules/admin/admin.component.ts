import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {SideMenuService} from "../../services/core/side-menu.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(public sideMenuService:SideMenuService) {
  }
}
