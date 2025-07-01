import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeDepositComponent } from './fee-deposit/fee-deposit.component';
import { AddFeeComponent } from './add-fee/add-fee.component';

const routes: Routes = [
    {
        path: '',
        component: FeeDepositComponent,
        data: {
          title:'class'
        },
      },
      {
        path: 'addFee/:feeId',
        component: AddFeeComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeDepositRoutingModule { }
