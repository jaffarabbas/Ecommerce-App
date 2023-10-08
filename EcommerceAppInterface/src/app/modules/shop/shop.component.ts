import { Component } from '@angular/core';
import { ProductCard } from 'src/app/interfaces/ProductCard';
import { Product } from 'src/app/models/products';
import { ProductHandlerService } from 'src/app/services/apiHandler/product-handler.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  isShowBanner:boolean = true;
  public productList:ProductCard[] = [];

  constructor(public productHandlerService:ProductHandlerService) { }
}
