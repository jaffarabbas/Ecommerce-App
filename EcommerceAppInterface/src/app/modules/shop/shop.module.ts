import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductCategoriesBarComponent } from './components/product-categories-bar/product-categories-bar.component';
import { ProductHeaderComponent } from './components/product-header/product-header.component';
import { ProductPaginationBarComponent } from './components/product-pagination-bar/product-pagination-bar.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { ProductDetailsComponent } from './components/product-details/product-details.component';


@NgModule({
  declarations: [
    ShopComponent,
    ProductsListComponent,
    ProductCategoriesBarComponent,
    ProductHeaderComponent,
    ProductPaginationBarComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedComponentsModule
  ]
})
export class ShopModule { }
