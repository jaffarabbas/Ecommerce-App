import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAdminLoggedInService {
  constructor() { }

  private flag: boolean = false;
  private flagSubject = new BehaviorSubject<boolean>(this.flag);

  get isAdminLoggedInValue(): boolean {
    return this.flag;
  }

  setFlag(value: boolean) {
    this.flag = value;
  }
}
