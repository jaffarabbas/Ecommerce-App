import {Component, Inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {SharedComponentsModule} from "../shared-components.module";
import {MaterialModule} from "../../material/material/material.module";
import {Product} from "../../../models/products";
import {detailViewData} from "../../../interfaces/detailViewData";

@Component({
  selector: 'app-custom-modal-for-detail-data',
  standalone: true,
    imports: [
        MaterialModule,
        SharedComponentsModule
    ],
  templateUrl: './custom-modal-for-detail-data.component.html',
  styleUrl: './custom-modal-for-detail-data.component.scss'
})
export class CustomModalForDetailDataComponent implements OnInit{
  heading:string = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }
  setHeading() {
    this.heading = this.data.heading;
  }

  setData(data:any,modal:string,metaData:detailViewData){
    console.log(data)
    console.log(metaData)
    console.log(modal)
  }

  ngOnInit(): void {
    this.setHeading()
    this.setData(this.data.data,this.data.modal,this.data.metaData)
  }
}
