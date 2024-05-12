import {Component, EventEmitter} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-custom-alert-dialog',
  templateUrl: './custom-alert-dialog.component.html',
  styleUrl: './custom-alert-dialog.component.scss'
})
export class CustomAlertDialogComponent {
  heading:string = ""
  subHeading:string = ""
  callback = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<CustomAlertDialogComponent>) {
  }

  callbackFunction() {
    this.callback.emit();
  }
}
