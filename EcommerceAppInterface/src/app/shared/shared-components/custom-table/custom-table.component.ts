import { AfterViewInit, Component, Input, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tableColumnData } from 'src/app/interfaces/tableColumn';
import { CustomTableBtnGroupComponent } from '../custom-table-btn-group/custom-table-btn-group.component';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent  implements OnInit{
  @Input() tableName!:string;
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() tableColumnData!:tableColumnData[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns!: string[];
  actionButtons:any[] = [];
  constructor(private viewContainerRef: ViewContainerRef) {
    
  }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedColumns = this.tableColumnData.map(column => column.property);
    this.actionButtons = [{
      label:"Edit",
      icon: "edit",
      color:"primary",
      action:()=>{}
    },{
      label:"Delete",
      icon: "delete",
      color:"warn",
      action:()=>{}
    }]
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCellContent(column: any, row: any): any {
    if (column.type === 'image') {
      return `<img src="${row[column.property]}" alt="Image" width="50" />`;
    } else if(column.type === 'btngroup'){
      return `<app-custom-table-btn-group [buttons]="actionButtons"></app-custom-table-btn-group>`;
    } else {
      return row[column.property];
    }
  }
}
