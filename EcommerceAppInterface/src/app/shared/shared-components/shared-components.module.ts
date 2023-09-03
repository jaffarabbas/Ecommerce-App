import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {RouterLink} from "@angular/router";
import { CustomBannerComponent } from './custom-banner/custom-banner.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CustomSubmitComponent } from './custom-submit/custom-submit.component';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CustomBannerComponent,
    ProductCardComponent,
    CustomSubmitComponent,
    ErrorHandlerComponent,
    CustomInputComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CustomBannerComponent,
    ProductCardComponent,
    ErrorHandlerComponent,
    CustomInputComponent
  ]
})
export class SharedComponentsModule { }
