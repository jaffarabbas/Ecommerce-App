import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductComponent } from './components/product/product.component';
import {LoginComponent} from "./components/login/login.component";
import { isAdminLoginGuard } from 'src/app/guards/is-admin-login.guard';
import { isLoginPageGuard } from 'src/app/guards/is-login-page.guard';

const routes: Routes = [
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:'login',canActivate:[isLoginPageGuard],component:LoginComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[isAdminLoginGuard]},
  {path:'products',component:ProductComponent,canActivate:[isAdminLoginGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
