import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/products';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from 'src/app/utilities/constants/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiService<Product>  {

  constructor(http:HttpClient) {
    super(http);
    this.apiUrl = ApiUrls.API_URL;
    this.apiController = ApiUrls.API_CONTROLLERS.Products;
  }
}
