import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AuthComponent } from './modules/auth/auth.component';
import { CartComponent } from './modules/cart/cart.component';
import { ShopComponent } from './modules/shop/shop.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { PaymentComponent } from './modules/payment/payment.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch: 'full'},
  {path:'home', component:HomeComponent,loadChildren:()=>import('./modules/home/home.module').then(m=>m.HomeModule)},
  {path:'auth', component:AuthComponent,loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)},
  {path:'cart', component:CartComponent, loadChildren:()=>import('./modules/cart/cart.module').then(m=>m.CartModule)},
  {path:'shop', component:ShopComponent, loadChildren:()=>import('./modules/shop/shop.module').then(m=>m.ShopModule)},
  {path:'checkout', component:CheckoutComponent ,loadChildren:()=>import('./modules/checkout/checkout.module').then(m=>m.CheckoutModule)},
  {path:'payment', component:PaymentComponent ,loadChildren:()=>import('./modules/payment/payment.module').then(m=>m.PaymentModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
