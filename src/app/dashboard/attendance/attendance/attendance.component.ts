import { Component } from '@angular/core';
import { AdmissionService } from '../../../services/admission/admission.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {
  attendanceData: any;
  formData: any;

  constructor(
    private admissionService: AdmissionService
  ) {
    const formData = { "className": "", "name": "", "rollNo": '', "uniqueId": "", "FatherName": "", "MobileNo": "", "section": "" };
    // this.attendanceList(formData);
    // this.getAttendance();
  }

  // search student list
  attendanceList(formData: any) {
    this.admissionService.AdmissionList(formData.value).subscribe(res => {
      if (res.success) {
        this.attendanceData = res.response;
      }
      console.log(res, "admission data")
    }, err => {
      console.log(err)
    })
  }

  // class api list
  getAttendance() {
    // thAs.classServive.classlist().subscribe((res) => {
    //   if (res.success) {
    //     this.totalClasses = res.response;
    //     console.log(this.totalClasses, "totals class");
    //   }

    //   console.log(res.data, "response data class list");
    // }, (error) => {
    //   console.log(error, "data is not patch ");
    //   return null
    // })
  }

  modalData() {
    // this.activeModal = this.modalService.open(AdmissionModalComponent, {
    //   size: "lg",
    //   backdrop: "static",
    //   keyboard: false
    // })
    // this.activeModal.componentInstance.user = "Add";
    // this.activeModal.componentInstance.totalClasses = this.totalClasses;
    // this.activeModal.result.then((result: any) => {
    //   if (result == "Add") {
    //     // do some work 
    //     this.studentList(this.formData)

    //   }
    // },
    //   (reason: any) => { }
    // )

  }

  edit(list: any, id: any) {

  }

  delete(id: any) {

  }

}
