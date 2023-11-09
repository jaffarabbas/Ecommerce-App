import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
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
export class CustomTableComponent  implements OnInit,AfterViewInit{
  @Input() tableName!:string;
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() tableColumnData!:tableColumnData[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns!: string[];
  actionButtons:any[] = [];
  constructor() {
  }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedColumns = this.tableColumnData.map(column => column.property);
  }

  ngAfterViewInit() {
   
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
    console.log(id);
  }
  edit(row:any,column:any){
    console.log(row);
    console.log("edit");
  }
  delete(row:any,column:any){
    console.log("delete");
  }

  getCellContent(column: any, row: any): any {
    if (column.type === 'image') {
      return `<img src="${row[column.property]}" alt="Image" width="50" />`;
    } else if(column.type === 'btngroup'){
      return `
      <div class="adminBtnGroup">
        <img (click)="edit()" src="../../../../assets/icons/detail.svg" height="20px"/>
        <button><img src="../../../../assets/icons/edit.svg" height="20px"/></button>
        <button><img src="../../../../assets/icons/delete.svg" height="20px"/></button>
      </div>
      `;
    } else {
      return row[column.property];
    }
  }
}
