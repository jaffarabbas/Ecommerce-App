import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AuthComponent } from './modules/auth/auth.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch: 'full'},
  {path:'home',component:HomeComponent,loadChildren:()=>import('./modules/home/home.module').then(m=>m.HomeModule)},
  {path:'auth',component:AuthComponent,loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
