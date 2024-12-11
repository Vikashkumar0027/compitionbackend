import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivilageComponent } from './privilage/privilage.component';

const routes: Routes = [
  {path:'',component:PrivilageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivilageRoutingModule { }
