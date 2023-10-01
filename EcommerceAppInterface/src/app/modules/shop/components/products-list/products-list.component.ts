import { Component, Input, OnInit } from '@angular/core';
import { ProductCard } from 'src/app/interfaces/ProductCard';
import { ProductHandlerService } from 'src/app/services/apiHandler/product-handler.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent{
  constructor(public productHadnlerService:ProductHandlerService) { 
  
  }
}
