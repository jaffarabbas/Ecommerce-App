import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AdminProductHandlerService} from "../../../../services/apiHandler/admin-product-handler.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import { Product } from 'src/app/models/products';
import { tableColumnData } from 'src/app/interfaces/tableColumn';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  dataSource!: MatTableDataSource<Product>;
  tableColumnData!:tableColumnData[];
  constructor(public adminProductHandlerService:AdminProductHandlerService,private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<Product>();
  }

  ngOnInit(): void {
    this.tableColumnData = [
      {id:"1",label:"ID",type:"int",property:"Pid"},
      {id:"2",label:"Name",type:"string",property:"Name"},
      {id:"3",label:"Description",type:"string",property:"Description"},
      {id:"4",label:"Price",type:"double",property:"Price"},
      {id:"5",label:"Category",type:"int",property:"Cid"},
      {id:"6",label:"Image",type:"image",property:"Image"},
      {id:"7",label:"Action",type:"btngroup",property:"action"}
    ];
    this.getProducts();
  }

  getProducts(){
    this.adminProductHandlerService.getAllProducts().subscribe((data:any)=>{
      if(data["Message"] == "Success"){
        this.dataSource.data = data["Data"];
      }else{
        this.dataSource.data = [];
        this.toastr.error(data["Data"]["message"]);
      }
    });
  }
}