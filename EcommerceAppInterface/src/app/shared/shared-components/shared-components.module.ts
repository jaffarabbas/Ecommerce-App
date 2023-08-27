import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {RouterLink} from "@angular/router";
import { CustomBannerComponent } from './custom-banner/custom-banner.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CustomSubmitComponent } from './custom-submit/custom-submit.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CustomBannerComponent,
    ProductCardComponent,
    CustomSubmitComponent
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
