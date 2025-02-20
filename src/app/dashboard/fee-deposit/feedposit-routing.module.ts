import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeDepositComponent } from './fee-deposit/fee-deposit.component';

const routes: Routes = [
    {
        path: '',
        component: FeeDepositComponent,
        data: {
          title:'class'
        },
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeDepositRoutingModule { }
