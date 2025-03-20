import { Component, OnInit } from '@angular/core';
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
  isChecked: boolean = false;
  totalAttendance: any[] = [];
  totalClasses: any;
  AdmissionData: any[] = [];
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
      this.AdmissionData = this.AdmissionData.map((x: any) => ({ ...x, attendance: '' }))
      console.log('AdmissionData:-', this.AdmissionData);

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
    // const presentStudent = this.attendanceData.filter(((x: any) => x._id == id))
    // this.totalAttendance.push(presentStudent[0]);
    console.log("PresentStudent", this.AdmissionData);
  }

  allPresent(event: any) {
    this.isChecked = event.target.checked;
    console.log('Checkbox changed:', this.isChecked);
    if (this.isChecked) {
      this.AdmissionData = this.AdmissionData.map((x: any) => ({ ...x, attendance: 'Present' }));
      console.log('PresentData:-', this.AdmissionData);

    } else {
      this.AdmissionData = this.AdmissionData.map((x: any) => ({ ...x, attendance: '' }));

    }

  }

  onSubmit() {
     this.AdmissionData.map(x => {
      this.totalAttendance = [
        {
          'userId': x._id,
          'name': x.studentName,
          'class': x.classId.className,
          'uniqueId': x.uniqueId,
          'year': x.date.slice(0, 4),
          'month': x.date.slice(5, 7),
          "attendance": [
            { 'date': x.date.slice(8, 10), 'status': x.attendance, 'entryTime': '9:20'}
          ]
        }
      ]
      console.log( 'Data:-', this.totalAttendance);
    })
  }

}
