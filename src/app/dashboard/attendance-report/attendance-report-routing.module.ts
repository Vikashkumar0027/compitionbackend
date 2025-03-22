import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { AttendanceViewComponent } from './attendance-view/attendance-view.component';

const routes: Routes = [
  {path: '', component: AttendanceReportComponent},
  {path: 'attendanceview', component: AttendanceViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceReportRoutingModule { }
