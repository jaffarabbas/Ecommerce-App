import { Injectable } from '@angular/core';
import { ProductService } from '../api/product.service';
import { ApiUrls } from 'src/app/utilities/constants/apiUrls';
import { LocalStorageService } from '../core/local-storage.service';
import { Product } from 'src/app/models/products';
import { ProductCard } from 'src/app/interfaces/ProductCard';

@Injectable({
  providedIn: 'root'
})
export class ProductHandlerService {
  public productList:ProductCard[] = [];
  constructor(private productServices:ProductService,private localStorageService:LocalStorageService) { }

  public getProductsByCid(id:any){
    let token = this.localStorageService.getItem("token")["JWTToken"];
    return this.productServices.getAllById(id,ApiUrls.API_END_POINTS.Products.GetProductByCid,token);
  }

  public setProductCategoryId(id:number){
    this.getProductsByCid(id).subscribe((res:any)=>{
      if(res["Message"] == "Success"){
        this.productList = res["Data"].map((item:any)=>{
          return {
            id:item["Pid"],
            name:item["Name"],
            imageUrl:item["Image"],
          };
        });
      }
      else{
        alert(res["Data"]["message"]);
      }
    });
  }
}
