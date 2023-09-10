import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent {
  @Input() class!: string;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() type: string = "text";
  @Input() placeholder: string = "";
  @Input() label: string = "";
  @Input() isRequired: boolean = false;
  @Input() errorMessage:string = "";
}
