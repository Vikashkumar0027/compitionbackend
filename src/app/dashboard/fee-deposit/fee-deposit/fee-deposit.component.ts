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
  isShow: boolean = false;

  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: any = {};


  Month: any[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  constructor(
    private admissionService: AdmissionService,
    private classServive: ClassService,
    private activeRoute: ActivatedRoute,
    private feeService: CatFeeService,
    private router: Router

  ) {

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
      if (res.success) {
        this.dropdownList = res.response.map((items: any) => ({
          id: items._id,
          itemName: items.name
        }));
        // console.log('feeList:-', this.dropdownList);
      }
    })

    // const date = new Date();
    // this.year = date.getFullYear();
    // this.month = this.Month[date.getMonth()];

    this.selectedItems = [

    ];
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Fee Types",
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      selectAllText: "Select All",
      classes: "myclass custom-class",
      // maxHeight: 300,
      badgeShowLimit: 2,
      addNewButtonText: "Add",
      showCheckbox: true,
      noDataLabel: 'No Data Available',

    };
  }

  // selector npm i angular2-multiselect-dropdown

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
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
    const formValue = formData.value;
    this.admissionService.AdmissionList(formData.value).subscribe(res => {
      const resValue = res.response[0];
      if (formValue.uniqueId == resValue.uniqueId || formValue.name == resValue.studentName || formValue.className == resValue.classId || formValue.section == resValue.section || formValue.rollNo == resValue.rollNo || formValue.MobileNo == resValue.studentMobile || formValue.FatherName == resValue.fatherName) {
        this.AdmissionData = res.response;
        this.isShow = true;
      }
      console.log(res, "Admission data");

    }, err => {
      console.log(err);
    })
  }


  feeDeposit(admission: any) {
    this.router.navigate(['/', 'dashboard', 'fee_deposit', 'addFee', admission._id]);
  }



}








