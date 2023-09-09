import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {DropdownItems} from "../../../interfaces/dropDownItems";

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent {
  @Input() class!: string;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() type: string = "text";
  @Input() placeholder: string = "";
  @Input() label: string = "";
  @Input() isRequired: boolean = false;
  @Input() dropdownOptions!: DropdownItems[];
  @Input() defaultValue: any;
  @Input() value!: any;
  @Output() onChange = new EventEmitter<any>();
  @Input() errorMessage!:string | null;


  detect(event: any) {
    if (event.target.value.length > 0) {
      this.errorMessage = null;
    }
  }
}
