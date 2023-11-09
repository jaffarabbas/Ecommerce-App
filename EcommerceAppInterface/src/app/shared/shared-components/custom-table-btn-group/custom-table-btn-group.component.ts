import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-table-btn-group',
  templateUrl: './custom-table-btn-group.component.html',
  styleUrls: ['./custom-table-btn-group.component.scss']
})
export class CustomTableBtnGroupComponent {
  @Output() edit:EventEmitter<any> = new EventEmitter<any>();
  @Output() details:EventEmitter<any> = new EventEmitter<any>();
  @Output() delete:EventEmitter<any> = new EventEmitter<any>();
}
