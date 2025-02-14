import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeeRoutingModule } from './fee-routing.module';
import { FeeComponent } from './fee/fee.component';


@NgModule({
  declarations: [
    FeeComponent
  ],
  imports: [
    CommonModule,
    FeeRoutingModule
  ]
})
export class FeeModule { }
