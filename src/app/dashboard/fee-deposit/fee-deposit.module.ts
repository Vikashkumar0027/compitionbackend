import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeeDepositComponent } from './fee-deposit/fee-deposit.component';
import { FeeDepositRoutingModule } from './feedposit-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFeeComponent } from './add-fee/add-fee.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';



@NgModule({
  declarations: [
    FeeDepositComponent,
    AddFeeComponent,
  ],
  imports: [
    CommonModule, FeeDepositRoutingModule,
    ReactiveFormsModule, FormsModule,
    AngularMultiSelectModule
  ]
})
export class FeeDepositModule { }
