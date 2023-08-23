import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IndexComponent } from './components/index/index.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { BannerComponent } from './components/banner/banner.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';


@NgModule({
  declarations: [
    HomeComponent,
    IndexComponent,
    AboutComponent,
    ContactComponent,
    BannerComponent,
    ProductsComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedComponentsModule
  ]
})
export class HomeModule { }
