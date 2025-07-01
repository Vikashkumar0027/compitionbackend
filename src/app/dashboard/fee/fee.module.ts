import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeeRoutingModule } from './fee-routing.module';
import { FeeComponent } from './fee/fee.component';
import { FeeModalComponent } from './fee-modal/fee-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FeeComponent,
    FeeModalComponent
  ],
  imports: [
    CommonModule, FormsModule,
    ReactiveFormsModule,
    FeeRoutingModule
  ]
})
export class FeeModule { }
