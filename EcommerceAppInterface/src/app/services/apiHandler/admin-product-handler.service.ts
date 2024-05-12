import { Injectable } from '@angular/core';
import { ProductService } from '../api/product.service';
import { LocalStorageService } from '../core/local-storage.service';
import { Product } from 'src/app/models/products';
import { ApiUrls } from 'src/app/utilities/constants/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class AdminProductHandlerService {

  constructor(private productServices:ProductService,private localStorageService:LocalStorageService) { }

  postProduct(product:Product){
    let token = this.localStorageService.getItem("adminToken")["JWTToken"];
    return this.productServices.create(product,ApiUrls.API_END_POINTS.Products.AddProduct,token);
  }

  public getAllProducts(){
    // let token = this.localStorageService.getItem("adminToken")["JWTToken"];
    return this.productServices.getAll(ApiUrls.API_END_POINTS.Products.GetProducts);
  }

  public getProduct(id:number){
    // let token = this.localStorageService.getItem("adminToken")["JWTToken"];
    return this.productServices.getById(id,ApiUrls.API_END_POINTS.Products.GetProduct);
  }

  public deleteProduct(id:number){
    return this.productServices.delete(id,ApiUrls.API_END_POINTS.Products.DeleteProduct);
  }
}
