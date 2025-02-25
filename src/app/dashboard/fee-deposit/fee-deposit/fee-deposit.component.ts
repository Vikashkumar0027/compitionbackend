import { Component } from '@angular/core';
import { AdmissionService } from '../../../services/admission/admission.service';
import { ClassService } from '../../../services/class/class.service';
import { ActivatedRoute, Router } from '@angular/router';


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
    private classServive: ClassService,
    private activeRoute: ActivatedRoute,
    private router: Router

  ) {
    // const formData = { "className": "", "name": "", "rollNo": "", "uniqueId": "", "FatherName": "", "MobileNo": "", "section": "" };
    // this.studentList(formData);
    this.getclass();
  }

  ngOnInit(): void {
    this.activeRoute.snapshot.paramMap.get('feeId');
  }

  // class api list
  getclass() {
    this.classServive.classlist().subscribe((res) => {
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


  // search student list
  studentList(formData: any) {
    console.log(formData.value)
    this.admissionService.AdmissionList(formData.value).subscribe(res => {
      if (res.success) {
        this.AdmissionData = res.response;
      }
      console.log(res, "admission data");
    }, err => {
      console.log(err);
    })
  }


  feeDeposit(admission: any) {
    this.router.navigate(['/', 'dashboard', 'fee_deposit', 'addFee', admission._id]);
  }

}








