import { NgModule } from '@angular/core';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {getStorage, provideStorage} from "@angular/fire/storage";

const modules:any = [
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideStorage(() => getStorage()),
]

@NgModule({
  declarations: [],
  imports: [
    ...modules
  ],
  exports: [
    ...modules,
  ],
  providers: [
    {
      provide: FIREBASE_OPTIONS,
      useValue: environment.firebaseConfig
    },
  ],
})
export class FirebaseModule { }
