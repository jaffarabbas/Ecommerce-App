import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {

  constructor() { }

  public isExpanded = true;
  public showSubmenu: boolean = false;
  public isShowing = false;
  public showSubSubMenu: boolean = false;

  sideList = [
    {
      id:1,
      icon: 'home',
      label: 'Dashboard',
      link: '',
      isActive: false
    },
    {
      id:2,
      icon: 'shopping_basket',
      label: 'Products',
      link: 'products',
      isActive: false
    },{
      id:3,
      icon: 'people',
      label: 'Users',
      link: 'users',
      isActive: false
    }
  ];

  public mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }
  public mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
