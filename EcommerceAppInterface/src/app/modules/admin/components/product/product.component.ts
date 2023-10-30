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
  tableColumnData!:tableColumnData[];
  constructor(public adminProductHandlerService:AdminProductHandlerService) {
    this.dataSource = new MatTableDataSource<Product>();
  }

  ngOnInit(): void {
    this.tableColumnData = [
      {id:"1",label:"ID",property:"Pid"},
      {id:"2",label:"Name",property:"Name"},
      {id:"3",label:"Description",property:"Description"},
      {id:"4",label:"Price",property:"Price"},
      {id:"5",label:"Category",property:"Cid"},
      {id:"6",label:"Image",property:"Image"},
      {id:"7",label:"Action",property:"action"}
    ];
    this.getProducts();
  }
  getProducts(){
    this.adminProductHandlerService.getAllProducts().subscribe((data:any)=>{
      this.dataSource.data = data["Data"];
    });
  }

}