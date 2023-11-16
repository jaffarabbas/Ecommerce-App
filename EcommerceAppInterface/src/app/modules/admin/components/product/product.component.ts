import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AdminProductHandlerService} from "../../../../services/apiHandler/admin-product-handler.service";
import {MatTableDataSource} from "@angular/material/table";
import { Product } from 'src/app/models/products';
import { tableColumnData } from 'src/app/interfaces/tableColumn';
import { Toast, ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import {NgForm} from "@angular/forms";
import {
  CustomModalForAddingDataComponent
} from "../../../../shared/shared-components/custom-modal-for-adding-data/custom-modal-for-adding-data.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  dataSource!: MatTableDataSource<Product>;
  tableColumnData!:tableColumnData[];
  constructor(
    public adminProductHandlerService:AdminProductHandlerService,
    private matDalog:MatDialog,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Product>();
    this.tableColumnData = [
      {id:"1",label:"ID",type:"int",property:"Pid",isInForm:false},
      {id:"2",label:"Name",type:"string",property:"Name",isInForm:true,formType:"text"},
      {id:"3",label:"Description",type:"string",property:"Description",isInForm:true,formType:"textarea"},
      {id:"4",label:"Price",type:"double",property:"Price",isInForm:true,formType:"number"},
      {id:"5",label:"Category",type:"int",property:"Cid",isInForm:true,formType:"select",options:[{value:1,label:"Electronics"},{value:2,label:"Clothes"}]},
      {id:"6",label:"Image",type:"image",property:"Image",isInForm:true,formType:"file"},
      {id:"7",label:"Action",type:"btngroup",property:"[Pid]",isInForm:false}
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

  onSubmit(form:NgForm){
    console.log(form);
  }

  openAddModal(){
    const dialogRef = this.matDalog.open(CustomModalForAddingDataComponent, {
      data: {
        tableColumnData: this.tableColumnData.filter((column) => column.isInForm),
        heading: "Add Product"
      },
    });

    dialogRef.componentInstance.formSubmitted.subscribe((formData) => {
      this.onSubmit(formData);
    });
  }
}
