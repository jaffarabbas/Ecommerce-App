import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {RouterLink} from "@angular/router";
import { CustomBannerComponent } from './custom-banner/custom-banner.component';
import { ProductCardComponent } from './product-card/product-card.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CustomBannerComponent,
    ProductCardComponent
  ],
    imports: [
        CommonModule,
        RouterLink
    ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CustomBannerComponent,
    ProductCardComponent
  ]
})
export class SharedComponentsModule { }
