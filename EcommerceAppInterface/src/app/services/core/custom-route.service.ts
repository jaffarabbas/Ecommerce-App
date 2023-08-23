import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CustomRouteService {

  constructor(private route:Router) { }

  public navigateTo(route:any) {
    this.route.navigate([route]);
  }

  public navigateToWithParams(route:any, params:any) {
    this.route.navigate([route, params]);
  }
}
