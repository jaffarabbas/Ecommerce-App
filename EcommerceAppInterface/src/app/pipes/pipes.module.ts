import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IsActivePipe} from "./is-active.pipe";


const pipes = [
  IsActivePipe,
]
@NgModule({
  declarations: [
    ...pipes
  ],
  exports: [
    IsActivePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
