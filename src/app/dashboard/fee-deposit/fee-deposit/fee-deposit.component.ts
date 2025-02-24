import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../../services/global/global.service';
import { AdmissionService } from '../../../services/admission/admission.service';
import { ClassService } from '../../../services/class/class.service';


@Component({
  selector: 'app-fee-deposit',
  templateUrl: './fee-deposit.component.html',
  styleUrl: './fee-deposit.component.css'
})
export class FeeDepositComponent {
  classId: any; // edit object id 
  AdmissionData: any[] = [];  // store all class list
  submitted = false; //search data validate
  viewDataId: any // admission view data id
  formData: any;
  totalClasses: any[] = [];

  constructor(
    private admissionService: AdmissionService,
    private classServive: ClassService

  ) {
    // const formData = { "className": "", "name": "", "rollNo": "", "uniqueId": "", "FatherName": "", "MobileNo": "", "section": "" };
    // this.studentList(formData);
    // this.getclass();
  }

  ngOnInit(): void {

  }

  // class api list
  getclass() {
    this.classServive.classlist().subscribe((res) => {
      if (res.success) {
        this.totalClasses = res.response;
        console.log(this.totalClasses, "totals class");
      }

      console.log(res.data, "response data class list");
    }, (error) => {
      console.log(error, "data is not patch ");
      return null
    })

  }


  // search student list
  studentList(formData: any) {
    this.admissionService.AdmissionList(formData.value).subscribe(res => {
      if (res.success) {
        this.AdmissionData = res.response;
        // this.isSearch = true;
      }
      console.log(res, "admission data")
    }, err => {
      console.log(err)
    })
  }


}








