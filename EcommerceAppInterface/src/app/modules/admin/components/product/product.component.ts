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
import {FileHandlerService} from "../../../../services/core/file-handler.service";
import {FileUrl} from "../../../../interfaces/fileUrl";
import {SpinnerFlagService} from "../../../../services/core/spinner-flag.service";
import {CustomAlertDialogService} from "../../../../services/core/custom-alert-dialog.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  dataSource!: MatTableDataSource<Product>;
  tableColumnData!:tableColumnData[];
  categories!:DropdownItems[];
  private imageUrls:FileUrl[] = [];
  constructor(
    public adminProductHandlerService:AdminProductHandlerService,
    public customAlertDialogService:CustomAlertDialogService,
    private adminCategoriesHandlerService:AdminCategoriesHandlerService,
    public fireStorage:StorageService,
    private spinnerService:SpinnerFlagService,
    private fileService:FileHandlerService,
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
      {id:"1",label:"ID",type:"int",property:"Pid",formController:{isInForm:false,validation:{required:false}}},
      {id:"2",label:"Name",type:"string",property:"Name",formController:{isInForm:true,formType:"text",validation:{required:false}}},
      {id:"3",label:"Description",type:"string",property:"Description",formController:{isInForm:true,formType:"textarea",validation:{required:false}}},
      {id:"4",label:"Price",type:"double",property:"Price",formController:{isInForm:true,formType:"number",validation:{required:false}}},
      {id:"5",label:"Quantity",type:"int",property:"Quantity",formController:{isInForm:true,formType:"number",validation:{required:false}}},
      {id:"6",label:"Category",type:"int",property:"Cid",formController:{isInForm:true,formType:"select",options:[],validation:{required:false}}},
      {id:"7",label:"Created On",type:"date",property:"CreatedOn"},
      {id:"8",label:"Active",type:"active",property:"ProductStatus"},
      {id:"9",label:"Image",type:"image",property:"Image",formController:{isInForm:true,formType:"file",validation:{required:false}}},
      {id:"10",label:"Action",type:"btngroup",property:"[Pid]",formController:{isInForm:false}}
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
    this.tableColumnData.filter((column) => column.property == "Cid")[0].formController.options = this.categories;
  }

  onSubmit(formData:any){
    formData["Image"]! = this.fileService.selectedFiles;
    let productData:Product = {
      name:formData["Name"],
      cid:formData["Cid"],
      description:formData["Description"],
      price:formData["Price"],
      quantity:formData["Quantity"],
    }
    this.spinnerService.spinnerFlag = true;
    // @ts-ignore
    this.uploadAttachments(formData["Image"]).then(()=>{
      productData.image = this.imageUrls.map((url)=>url.url).join(',');
      this.adminProductHandlerService.postProduct(productData).subscribe((data:any)=>{
        if(data["Message"] == "Success"){
          this.toastr.success("Product Added Successfully");
          this.getProducts();
        }else{
          this.toastr.error(data["Data"]["message"]);
          // this.fireStorage.delete(this.imageUrls.map((url)=>url.name));
        }
        this.spinnerService.spinnerFlag = false;
        this.matDialog.closeAll()
        this.fileService.selectedFiles = [];
      });
    }).catch((error)=>{
      console.log(error);
      this.spinnerService.spinnerFlag = false;
      this.matDialog.closeAll()
    });
  }

  async uploadAttachments(files: File[]) {
    let fileArray = Array.from(files);
    const uploadPromises = fileArray.map(async (file) => {
      try {
        // @ts-ignore
        const url:FileUrl = await this.fireStorage.upload(file);
        if (url.type === 'image') {
          this.imageUrls.push(url);
        }
      } catch (error) {
        console.log(error);
      }
    });

    await Promise.all(uploadPromises);
  }

  details(id:number){
    console.log(id);
  }
  editProducts(id:number){
    console.log(id);
  }

  deleteProducts(id:number){
    // this.adminProductHandlerService.
    this.customAlertDialogService.openDialog("Product","product","0.0ms","0.0ms",() =>{
      this.deleteImagesFromFireStorage(id).then(() => {
        this.adminProductHandlerService.deleteProduct(id).subscribe((data:any)=>{
          if(data["Message"] == "Success"){
            this.toastr.success("Product Deleted Successfully");
            this.getProducts();
          }else{
            this.toastr.error(data["Data"]["message"]);
          }
        });
      })
    });
  }

  async deleteImagesFromFireStorage(id:number){
    await this.adminProductHandlerService.getProduct(id).subscribe((data:any)=>{
      if(data["Message"] == "Success"){
        console.log(data["Data"]["Image"])
        let dataImageList = data["Data"]["Image"].split(",")
        dataImageList.forEach((data:any) => {
          this.fireStorage.delete(data).then((flag) => {
            console.log('File deleted')
          })
        })
      }else{
        this.toastr.error(data["Data"]["message"]);
      }
    });
  }
  refresh(){
    this.getProducts();
  }

  openAddModal(){
    const dialogRef = this.matDialog.open(CustomModalForAddingDataComponent, {
      data: {
        tableColumnData: this.tableColumnData.filter((column) => column.formController?.isInForm),
        heading: "Add Product",
      },
    });

    dialogRef.componentInstance.formSubmitted.subscribe((formData) => {
      this.onSubmit(formData);
    });
  }

}
