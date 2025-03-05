import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidayComponent } from './holiday/holiday.component';

const routes: Routes = [
  {
    path: '',
    component: HolidayComponent,
    data: {
      title: 'Holiday'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HolidayRoutingModule { }
