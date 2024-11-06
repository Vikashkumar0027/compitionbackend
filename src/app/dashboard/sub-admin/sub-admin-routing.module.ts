import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubadminComponent } from './subadmin/subadmin.component';

const routes: Routes = [
  {
    path: '',
    component: SubadminComponent,
    data: {
      title: 'subAdmin '
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubAdminRoutingModule { }
