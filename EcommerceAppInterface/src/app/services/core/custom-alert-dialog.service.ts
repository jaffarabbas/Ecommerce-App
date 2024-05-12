import {EventEmitter, Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  CustomAlertDialogComponent
} from "../../shared/shared-components/custom-alert-dialog/custom-alert-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class CustomAlertDialogService {
  constructor(public dialog: MatDialog) {}

  openDialog(heading:string , subHeading:string,enterAnimationDuration: string, exitAnimationDuration: string,callback:() => void): void {
    let dialog = this.dialog.open(CustomAlertDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialog.componentInstance.heading = heading
    dialog.componentInstance.subHeading = subHeading
    dialog.componentInstance.callback.subscribe(() => {
      callback()
    })
    dialog.afterClosed().subscribe(result => {
      dialog.componentInstance.callback.unsubscribe();
    })
  }
}
