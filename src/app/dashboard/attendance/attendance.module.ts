import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance/attendance.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AttendanceComponent
  ],
  imports: [
    CommonModule, FormsModule,
    AttendanceRoutingModule
  ]
})
export class AttendanceModule { }
