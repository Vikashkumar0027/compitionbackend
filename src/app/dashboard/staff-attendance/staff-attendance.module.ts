import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffAttendanceRoutingModule } from './staff-attendance-routing.module';
import { StaffAttendenceComponent } from './staff-attendence/staff-attendence.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StaffAttendenceComponent
  ],
  imports: [
    CommonModule,
    StaffAttendanceRoutingModule,
    FormsModule
  ]
})
export class StaffAttendanceModule { }
