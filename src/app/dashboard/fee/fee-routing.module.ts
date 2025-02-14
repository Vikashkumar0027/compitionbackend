import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeComponent } from './fee/fee.component';

const routes: Routes = [
    {
        path: '',
        component: FeeComponent,
        data: {
          title:'class'
        },
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeRoutingModule { }
