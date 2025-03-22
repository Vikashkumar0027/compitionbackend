import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceReportRoutingModule } from './attendance-report-routing.module';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendanceViewComponent } from './attendance-view/attendance-view.component';



@NgModule({
  declarations: [
    AttendanceReportComponent,
    AttendanceViewComponent,
  ],
  imports: [
    CommonModule, ReactiveFormsModule,
    AttendanceReportRoutingModule,
    FormsModule
  ]
})
export class AttendanceReportModule { }
