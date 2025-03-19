import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffAttendenceComponent } from './staff-attendence/staff-attendence.component';

const routes: Routes = [
  { path: "", component: StaffAttendenceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffAttendanceRoutingModule { }
