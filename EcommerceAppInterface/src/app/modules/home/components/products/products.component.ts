import { Component } from '@angular/core';
import {ProductCard} from "../../../../interfaces/ProductCard";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  ListProducts:ProductCard[] = [
    {
      id: 1,
      name: 'Product 1',
      imageUrl: '../../../../../assets/images/productPic1.png'
    },
    {
      id: 2,
      name: 'Product 2',
      imageUrl: '../../../../../assets/images/productPic2.png'
    },{
      id: 3,
      name: 'Product 3',
      imageUrl: '../../../../../assets/images/productPic3.png'
    },{
      id: 4,
      name: 'Product 4',
      imageUrl: '../../../../../assets/images/productPic4.png'
    }
  ];
}
