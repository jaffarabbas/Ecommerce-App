import { Component } from '@angular/core';
import {SideMenuService} from "../../../services/core/side-menu.service";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {
  constructor(public sideMenuService:SideMenuService) {
  }
}
