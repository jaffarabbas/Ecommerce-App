import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Category } from 'src/app/models/categories';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from 'src/app/utilities/constants/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends ApiService<Category>  {

  constructor(http:HttpClient) {
    super(http);
    this.apiUrl = ApiUrls.API_URL;
    this.apiController = ApiUrls.API_CONTROLLERS.Categories;
  }
}