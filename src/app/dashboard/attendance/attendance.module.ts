import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance/attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';


@NgModule({
  declarations: [
    AttendanceComponent,
  ],
  imports: [
    CommonModule, FormsModule,
    AttendanceRoutingModule,
    ReactiveFormsModule,
    AngularMultiSelectModule
  ]
})
export class AttendanceModule { }
