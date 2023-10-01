import { Injectable } from '@angular/core';
import { CategoriesService } from '../api/categories.service';
import { LocalStorageService } from '../core/local-storage.service';
import { ApiUrls } from 'src/app/utilities/constants/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class CategoriesHandlerService {

  constructor(private categoriesService:CategoriesService,private localStorageService:LocalStorageService) { }

  public getAllCategories(){
    let token = this.localStorageService.getItem("token")["JWTToken"];
    return this.categoriesService.getAll(ApiUrls.API_END_POINTS.Categories.GetAllCategories,token);
  }
}
