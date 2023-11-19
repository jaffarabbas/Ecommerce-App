import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerFlagService {

  constructor() { }

  spinnerFlag:boolean = false;
}
