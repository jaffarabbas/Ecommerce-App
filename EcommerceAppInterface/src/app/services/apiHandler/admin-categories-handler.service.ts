import { Injectable } from '@angular/core';
import {LocalStorageService} from "../core/local-storage.service";
import {CategoriesService} from "../api/categories.service";
import {ApiUrls} from "../../utilities/constants/apiUrls";

@Injectable({
  providedIn: 'root'
})
export class AdminCategoriesHandlerService {

  constructor(private categoriesService:CategoriesService,private localStorageService:LocalStorageService) { }

  public getAllCategories(){
    let token = this.localStorageService.getItem("adminToken")["JWTToken"];
    return this.categoriesService.getAll(ApiUrls.API_END_POINTS.Categories.GetAllCategories,token);
  }
}
