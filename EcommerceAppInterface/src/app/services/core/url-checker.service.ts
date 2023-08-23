import {Injectable, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UrlCheckerService implements OnInit , OnChanges{
  currentRoute: string = '';
  urlList = [
    'register',
    'registerEmail',
    'confirmEmail',
    'auth/register',
    'auth/registerEmail',
    'auth/confirmEmail',
  ];

  constructor(private router: Router) {
    this.routerEvent();
  }

  routerEvent() {
    console.log('routerEvent')
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
    console.log(this.currentRoute);
  }

  checkUrl():boolean{
    for (let i = 0; i < this.urlList.length; i++) {
      if (this.currentRoute.includes(this.urlList[i])) {
        console.log('true');
        return false;
      }
    }
    return true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.routerEvent();
  }

  ngOnInit(): void {
    this.routerEvent();
  }
}
