import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { ProductComponent } from './components/product/product.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MaterialModule} from "../../shared/material/material/material.module";
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from "./components/login/login.component";
import {MatInputModule} from "@angular/material/input";
import { CategoriesComponent } from './components/categories/categories.component';
import { AccountTypeComponent } from './components/account-type/account-type.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    LoginComponent,
    ProductComponent,
    CategoriesComponent,
    AccountTypeComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedComponentsModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule
  ]
})
export class AdminModule { }
