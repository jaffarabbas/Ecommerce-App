import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AdminProductHandlerService} from "../../../../services/apiHandler/admin-product-handler.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import { Product } from 'src/app/models/products';
import { tableColumnData } from 'src/app/interfaces/tableColumn';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  dataSource!: MatTableDataSource<Product>;
  tableColumnData:tableColumnData[] = [];
  constructor(public adminProductHandlerService:AdminProductHandlerService) {}
  ngOnInit(): void {
    this.getProducts();
    this.tableColumnData = [
      {id:"1",label:"ID",property:"id"},
      {id:"2",label:"Name",property:"name"},
      {id:"3",label:"Description",property:"description"},
      {id:"4",label:"Price",property:"price"},
      {id:"5",label:"Category",property:"category"},
      {id:"6",label:"Image",property:"image"},
      {id:"7",label:"Action",property:"action"}
    ];
  }
  getProducts(){
    this.adminProductHandlerService.getAllProducts().subscribe((data:any)=>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
  }

}