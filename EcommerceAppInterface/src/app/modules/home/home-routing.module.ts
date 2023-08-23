import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {path:'',redirectTo:'index',pathMatch: 'full'},
  {path:'index',component:IndexComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
