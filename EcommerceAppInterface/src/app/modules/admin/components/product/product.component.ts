import {Component, OnInit} from '@angular/core';
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
import {AdminCategoriesHandlerService} from "../../../../services/apiHandler/admin-categories-handler.service";
import {Category} from "../../../../models/categories";
import {DropdownItems} from "../../../../interfaces/dropDownItems";
import {StorageService} from "../../../../services/firebase/storage.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  dataSource!: MatTableDataSource<Product>;
  tableColumnData!:tableColumnData[];
  categories!:DropdownItems[];
  constructor(
    public adminProductHandlerService:AdminProductHandlerService,
    private adminCategoriesHandlerService:AdminCategoriesHandlerService,
    public fireStorage:StorageService,
    private matDialog:MatDialog,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Product>();
    this.getCategories();
    this.initializeTableColumnData();
    this.getProducts();
  }

  initializeTableColumnData(){
    this.tableColumnData = [
      {id:"1",label:"ID",type:"int",property:"Pid",isInForm:false},
      {id:"2",label:"Name",type:"string",property:"Name",isInForm:true,formType:"text"},
      {id:"3",label:"Description",type:"string",property:"Description",isInForm:true,formType:"textarea"},
      {id:"4",label:"Price",type:"double",property:"Price",isInForm:true,formType:"number"},
      {id:"5",label:"Category",type:"int",property:"Cid",isInForm:true,formType:"select",options:[]},
      {id:"6",label:"Image",type:"image",property:"Image",isInForm:true,formType:"file"},
      {id:"7",label:"Action",type:"btngroup",property:"[Pid]",isInForm:false}
    ];
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

  getCategories(){
    this.adminCategoriesHandlerService.getAllCategories().subscribe((data:any)=>{
      if(data["Message"] == "Success"){
        this.categories = data["Data"].map((item:any)=>{
          return {
            id:item["Cid"],
            name:item["Cname"]
          };
        });
        this.populateCategoryDropdown();
      }else{
        this.categories = [];
        this.toastr.error(data["Data"]["message"]);
      }
    });
  }

  populateCategoryDropdown(){
    // @ts-ignore
    this.tableColumnData.filter((column) => column.property == "Cid")[0].options = this.categories;
  }

  onSubmit(file:File[]){

  }

  uploadAttachments(file:File[]){
    // @ts-ignore
    for (let i = 0; i < file.length; i++) {
      // @ts-ignore
      this.fireStorage.upload(file.value[i]).then((url:FileUrl)=>{
        console.log(url);
        if(url.type == 'image'){

        }
      }).catch((error)=>{
        console.log(error);
      });
    }
  }


  openAddModal(){
    const dialogRef = this.matDialog.open(CustomModalForAddingDataComponent, {
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
