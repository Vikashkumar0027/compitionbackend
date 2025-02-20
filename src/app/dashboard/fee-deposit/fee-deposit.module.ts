import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeeDepositComponent } from './fee-deposit/fee-deposit.component';
import { FeeDepositRoutingModule } from './feedposit-routing.module';



@NgModule({
  declarations: [
    FeeDepositComponent
  ],
  imports: [
    CommonModule,FeeDepositRoutingModule
  ]
})
export class FeeDepositModule { }
