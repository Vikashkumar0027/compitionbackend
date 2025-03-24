import { Component } from '@angular/core';
import { AttendanceService } from '../../../services/attendance/attendance.service';
import { GlobalService } from '../../../services/global/global.service';
import { ClassService } from '../../../services/class/class.service';
import { AdmissionService } from '../../../services/admission/admission.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrl: './attendance-report.component.css'
})
export class AttendanceReportComponent {
  attendanceData: any;
  totalClasses: any;

  constructor(
    private attendanceService: AttendanceService,
    private globalService: GlobalService,
    private classService: ClassService,
    private activateRoute: ActivatedRoute,
    private router: Router,
  ) {
    const formData = { "className": "", "name": "", "rollNo": "", "uniqueId": "", "FatherName": "", "MobileNo": "", "section": "" };
    this.searchAttendance(formData);
    this.studentList();

    activateRoute.snapshot.paramMap.get('_id');
  }

  // search student list
  searchAttendance(formData: any) {
    console.log(formData.value)
    this.attendanceService.attendanceList().subscribe(res => {
      this.attendanceData = res.response;

    })
  }

  // Student list
  studentList() {
    this.classService.classlist().subscribe((res) => {
      if (res.success) {
        this.totalClasses = res.response;
        console.log("Total class:-", this.totalClasses);
      }
      console.log("Response class list:-", res.data);
    }, (err) => {
      console.log(err);
      return null;
    })

  }

  edit(list: any, id: any) {

  }

  delete(list: any) {

  }

  view() {
    this.router.navigate(['/dashboard/attendanceReport/attendanceview']);
  }
}
