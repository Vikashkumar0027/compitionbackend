import { Component } from '@angular/core';
import { AdmissionService } from '../../../services/admission/admission.service';
import { ClassService } from '../../../services/class/class.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CatFeeService } from '../../../services/cat_fee/cat-fee.service';


@Component({
  selector: 'app-fee-deposit',
  templateUrl: './fee-deposit.component.html',
  styleUrl: './fee-deposit.component.css'
})
export class FeeDepositComponent {
  classId: any; // edit object id 
  AdmissionData: any[] = [];  // store all class list
  admission: any[] = [];  // store all class list
  submitted = false; //search data validate
  viewDataId: any // admission view data id
  formData: any;
  year: any;
  month: any;
  feeType: any;
  totalClasses: any[] = [];

  Month: any[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  constructor(
    private admissionService: AdmissionService,
    private classServive: ClassService,
    private activeRoute: ActivatedRoute,
    private feeService: CatFeeService,
    private router: Router

  ) {
    const formData = { "className": "", "name": "", "rollNo": "", "uniqueId": "", "FatherName": "", "MobileNo": "", "section": "" };
    // this.studentList(formData);
    this.getclass();
  }

  ngOnInit(): void {
    this.activeRoute.snapshot.paramMap.get('feeId');
    this.admissionService.AdmissionList(this.formData).subscribe(res => {
      if (res.success) {
        this.admission = res.response;
      }

      console.log(res, "admission data");
    })
    this.feeService.feeList().subscribe(res => {
      console.log('feeList:-', res.response);
      this.feeType = res.response;
    })

    const date = new Date();
    this.year = date.getFullYear();
    this.month = this.Month[date.getMonth()];
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








