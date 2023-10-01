import { Component, OnInit } from '@angular/core';
import { ProductCard } from 'src/app/interfaces/ProductCard';
import { Category } from 'src/app/models/categories';
import { CategoriesHandlerService } from 'src/app/services/apiHandler/categories-handler.service';
import { ProductHandlerService } from 'src/app/services/apiHandler/product-handler.service';

@Component({
  selector: 'app-product-categories-bar',
  templateUrl: './product-categories-bar.component.html',
  styleUrls: ['./product-categories-bar.component.scss']
})
export class ProductCategoriesBarComponent implements OnInit{
  categoriesList:Category[] = [];
  constructor(private categoriesHandlerService:CategoriesHandlerService,private productHandlerService:ProductHandlerService){}

  ngOnInit(): void {
    this.populateCategories();
    this.productHandlerService.setProductCategoryId(1);
  }

  populateCategories(){
    this.categoriesHandlerService.getAllCategories().subscribe((res:any)=>{
      if(res["Message"] == "Success")
        this.categoriesList = res["Data"];
      else
        alert(res["Data"]["message"]);
    });
  }

  getSelectedTabId(id:number){
    this.productHandlerService.setProductCategoryId(id);
  }
}
