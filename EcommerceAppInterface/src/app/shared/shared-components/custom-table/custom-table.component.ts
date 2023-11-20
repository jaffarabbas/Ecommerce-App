import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tableColumnData } from 'src/app/interfaces/tableColumn';
import { CustomTableBtnGroupComponent } from '../custom-table-btn-group/custom-table-btn-group.component';
import {IsActivePipe} from "../../../pipes/is-active.pipe"

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent  implements OnInit,AfterViewInit{
  @Input() tableName!:string;
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() tableColumnData!:tableColumnData[];
  @Output() addData:EventEmitter<any> = new EventEmitter<any>();
  @Output() editData:EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteData:EventEmitter<any> = new EventEmitter<any>();
  @Output() dataDetails:EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('imageCell', { static: true }) imageCell!: TemplateRef<any>;
  @ViewChild('btnGroupCell', { static: true }) btnGroupCell!: TemplateRef<any>;
  @ViewChild('dateCell', { static: true }) dateCell!: TemplateRef<any>;
  @ViewChild('isActiveCell', { static: true }) isActiveCell!: TemplateRef<any>;
  @ViewChild('defaultCell', { static: true }) defaultCell!: TemplateRef<any>;

  displayedColumns!: string[];
  actionButtons:any[] = [];
  constructor() {
  }
  ngOnInit(): void {
    this.displayedColumns = this.tableColumnData.map(column => column.property);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  idScrapper(row:any,column:any){
    let id = column;
    const resultArray = [id.substring(1, id.length - 1)];
    return row[resultArray[0]];
  }

  details(row:any,column:any){
    let id  = this.idScrapper(row,column);
  }
  edit(row:any,column:any){
    let id  = this.idScrapper(row,column);
    this.editData.emit(id);
  }
  delete(row:any,column:any){
    let id  = this.idScrapper(row,column);
    console.log(id);
  }

  getCellTemplate(column: any): any {
    const templateMappings: { [key: string]: any } = {
      'image': this.imageCell,
      'btngroup': this.btnGroupCell,
      'date': this.dateCell,
      'active': this.isActiveCell,
      'default': this.defaultCell
    };

    const template = templateMappings[column.type] || templateMappings['default'];
    return template;
  }
}
