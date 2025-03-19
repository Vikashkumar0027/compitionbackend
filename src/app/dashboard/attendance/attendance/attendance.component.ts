import { Component } from '@angular/core';
import { AdmissionService } from '../../../services/admission/admission.service';
import { AttendanceService } from '../../../services/attendance/attendance.service';
import { GlobalService } from '../../../services/global/global.service';
import { ClassService } from '../../../services/class/class.service';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {
  attendanceData: any;
  formData: any;
  isSelectStudent: boolean = false;
  totalAttendance: any;
  totalClasses: any;
  AdmissionData: any;
  atdDatails: any;
  attendance: any = '';

  constructor(
    private attendanceService: AttendanceService,
    private globalService: GlobalService,
    private classService: ClassService,
    private admissionService: AdmissionService
  ) {
    const formData = { "className": "", "name": "", "rollNo": "", "uniqueId": "", "FatherName": "", "MobileNo": "", "section": "" };
    this.attendanceList(formData);
    this.getAttendance();

  }


  // search student list
  attendanceList(formData: any) {
    console.log(formData.value)
    this.admissionService.AdmissionList(formData.value).subscribe(res => {
      this.AdmissionData = res.response;
      console.log(this.AdmissionData, " AdmissionData");
      this.isSelectStudent = true;
    })
  }



  // Student list
  getAttendance() {
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

  studentAttendance(event: any, id: any) {
    console.log(event, id);
    const filterData = this.attendanceData.map((x:any) => {
      console.log(filterData);
        return {...x, Attendance:''};     
    })
  }


  edit(list: any, id: any) {

  }

  delete(id: any) {

  }

}
