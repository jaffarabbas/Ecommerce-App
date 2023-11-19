import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-is-active-status',
  templateUrl: './is-active-status.component.html',
  styleUrls: ['./is-active-status.component.scss']
})
export class IsActiveStatusComponent {
  @Input() isActive!:boolean;
  constructor() {
    console.log(this.isActive);
  }
}
