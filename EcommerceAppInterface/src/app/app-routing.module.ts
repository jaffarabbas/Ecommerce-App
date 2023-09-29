import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AuthComponent } from './modules/auth/auth.component';
import { CartComponent } from './modules/cart/cart.component';
import { ShopComponent } from './modules/shop/shop.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { PaymentComponent } from './modules/payment/payment.component';
import { isUserloggedInGuard } from './guards/is-userlogged-in.guard';
import { navigateToHomeGuard } from './guards/navigate-to-home.guard';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch: 'full'},
  {path:'home', component:HomeComponent,loadChildren:()=>import('./modules/home/home.module').then(m=>m.HomeModule)},
  {path:'auth', canActivate:[navigateToHomeGuard],component:AuthComponent,loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)},
  {path:'cart', canActivate:[isUserloggedInGuard],component:CartComponent, loadChildren:()=>import('./modules/cart/cart.module').then(m=>m.CartModule)},
  {path:'shop', canActivate:[isUserloggedInGuard],component:ShopComponent, loadChildren:()=>import('./modules/shop/shop.module').then(m=>m.ShopModule)},
  {path:'checkout', canActivate:[isUserloggedInGuard],component:CheckoutComponent ,loadChildren:()=>import('./modules/checkout/checkout.module').then(m=>m.CheckoutModule)},
  {path:'payment', canActivate:[isUserloggedInGuard],component:PaymentComponent ,loadChildren:()=>import('./modules/payment/payment.module').then(m=>m.PaymentModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
