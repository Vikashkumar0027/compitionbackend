import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeeDepositComponent } from './fee-deposit/fee-deposit.component';
import { FeeDepositRoutingModule } from './feedposit-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FeeDepositComponent,
  ],
  imports: [
    CommonModule,FeeDepositRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class FeeDepositModule { }
