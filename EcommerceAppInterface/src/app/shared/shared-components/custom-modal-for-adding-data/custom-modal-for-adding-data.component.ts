import {Component, EventEmitter, inject, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NgForm} from "@angular/forms";
import {FileHandlerService} from "../../../services/core/file-handler.service";

@Component({
  selector: 'app-custom-modal-for-adding-data',
  templateUrl: './custom-modal-for-adding-data.component.html',
  styleUrls: ['./custom-modal-for-adding-data.component.scss']
})
export class CustomModalForAddingDataComponent {
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  heading:string = "";
  formFields: any[] = [];

  fileService = inject(FileHandlerService);
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.initializeFormFields();
    this.setHeading();
  }

  setHeading() {
    this.heading = this.data.heading;
  }
  initializeFormFields() {
    for (const field of this.data.tableColumnData) {
      if (field.isInForm) {
        this.formFields.push({
          property: field.property,
          label: field.label,
          type: field.formType,
          options: field.options || [],
        });
      }
    }
  }
  onFileChange(fileInputEvent: any) {
    this.fileService.selectedFiles = fileInputEvent.target.files;
    console.log(this.fileService.selectedFiles);
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.formSubmitted.emit(form.value);
    }
  }

  protected readonly fetch = fetch;
}
