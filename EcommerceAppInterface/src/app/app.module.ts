import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { FirebaseModule } from './shared/firebase/firebase.module';
import {MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER} from "@angular/material/autocomplete";
import {MAT_SELECT_SCROLL_STRATEGY_PROVIDER} from "@angular/material/select";
import {MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FirebaseModule
  ],
  providers: [
    MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER,
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
    MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
