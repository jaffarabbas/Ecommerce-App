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
import { CustomDropdownComponent } from './custom-dropdown/custom-dropdown.component';
import { CustomSpinnerComponent } from './custom-spinner/custom-spinner.component';
import { MaterialModule } from '../material/material/material.module';
import { AdminHeaderDropdownComponent } from './admin-header-dropdown/admin-header-dropdown.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidenavComponent } from './admin-sidenav/admin-sidenav.component';
import { AdminSidenavListComponent } from './admin-sidenav-list/admin-sidenav-list.component';
import { AdminSidenavItemsComponent } from './admin-sidenav-items/admin-sidenav-items.component';
import { CustomTableComponent } from './custom-table/custom-table.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CustomBannerComponent,
    ProductCardComponent,
    CustomSubmitComponent,
    ErrorHandlerComponent,
    CustomInputComponent,
    CustomDropdownComponent,
    CustomSpinnerComponent,
    AdminHeaderDropdownComponent,
    AdminHeaderComponent,
    AdminSidenavComponent,
    AdminSidenavListComponent,
    AdminSidenavItemsComponent,
    CustomTableComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CustomBannerComponent,
    ProductCardComponent,
    ErrorHandlerComponent,
    CustomInputComponent,
    CustomDropdownComponent,
    CustomSpinnerComponent,
    AdminHeaderDropdownComponent,
    AdminHeaderComponent,
    AdminSidenavComponent,
    AdminSidenavListComponent,
    AdminSidenavItemsComponent,
    CustomTableComponent
  ]
})
export class SharedComponentsModule { }
