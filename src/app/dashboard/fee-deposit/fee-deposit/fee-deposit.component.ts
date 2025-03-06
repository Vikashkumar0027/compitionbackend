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
  month: any;
  feeType: any;
  totalClasses: any[] = [];
  isShow: boolean = false;
  isSelectStudent: boolean = false;
  studentselectDatails: any = {};
  // multi selector fee type
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: any = {};

  // multi selector months 
  dropdownMonthList: any[] = [];
  selectedMonths: any[] = [];
  dropdownMonthSettings: any = {};

  // fee calculate 

  // TotalFee: any;
  totalFeeSum: any = 0;
  totalDepositFee: any = 0;
  totalReceivedAmount: any = 0;
  concessionFee: any = 0;
  totalConcession: any = 0;
  ReceivedAmount: any = 0;



  // current date 
  currentYear: number = new Date().getFullYear();
  year: number = this.currentYear;

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
          itemName: items.name,
          fee: items.fee
        }));


      }
    })



    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Fee Types",
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      selectAllText: "Select All",
      classes: "myclass custom-class",
      badgeShowLimit: 2,
      addNewButtonText: "Add",
      showCheckbox: true,
      noDataLabel: 'No Data Available',
    };



    // multi  selector field  months
    this.selectedMonths = [];


    this.dropdownMonthList = [
      { "id": 1, "itemName": "January", },
      { "id": 2, "itemName": "February", },
      { "id": 3, "itemName": "March", },
      { "id": 4, "itemName": "April", },
      { "id": 5, "itemName": "May", },
      { "id": 6, "itemName": "June", },
      { "id": 7, "itemName": "July", },
      { "id": 8, "itemName": "August", },
      { "id": 9, "itemName": "September", },
      { "id": 10, "itemName": "October", },
      { "id": 11, "itemName": "November", },
      { "id": 12, "itemName": "December", },
    ]

    this.dropdownMonthSettings = {
      singleSelection: false,
      text: "Select Months",
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      selectAllText: "Select All",
      classes: "myclass custom-class",
      maxHeight: 300,
      badgeShowLimit: 2,
      addNewButtonText: "Add",
      showCheckbox: true,
      noDataLabel: 'No Data Available',
    };



  }

  // multi  selector field  

  onItemSelect(item: any) {
    this.sumCalculate();
    this.multiCalculate();


  }
  OnItemDeSelect(item: any) {
    this.sumCalculate();
    this.multiCalculate();
  }
  onSelectAll(items: any) {
    this.sumCalculate();
    this.multiCalculate();

  }
  onDeSelectAll(items: any) {
    this.sumCalculate();
    this.multiCalculate();
  }


  multiCalculate() {
    this.totalDepositFee = this.selectedMonths.length * this.totalFeeSum;
    this.onConcession()
    this.onReceivedAmount();
  }

  sumCalculate() {
    this.totalFeeSum = this.selectedItems.reduce((acc, num) => acc + num.fee, 0);
    this.onConcession();
    this.onReceivedAmount();
  }


  onConcession() {
    this.onReceivedAmount();
    if (this.concessionFee < this.totalDepositFee) {
      this.totalConcession = this.totalDepositFee - this.concessionFee; // Direct calculation
    } else {
      this.totalConcession = this.totalDepositFee;
    }
  }

  balance: any = 0;
  onReceivedAmount() {
    if (this.totalConcession >= this.totalReceivedAmount) {
      this.ReceivedAmount = this.totalConcession - this.totalReceivedAmount;

    } else {
      if (this.ReceivedAmount = 0) {
        this.balance = this.ReceivedAmount - this.totalConcession;
      }
      // this.ReceivedAmount = 0;
    }

  }

  // multi  selector field  months
  onMonthSelect(item: any) {
    this.multiCalculate();

  }
  OnMonthDeSelect(item: any) {
    this.multiCalculate();

  }
  onMonthSelectAll(items: any) {
    this.multiCalculate();

  }
  onMonthDeSelectAll(items: any) {
    this.multiCalculate();

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
        console.log(this.AdmissionData, "hello admission");
        this.isShow = true;

        if (formValue.uniqueId == resValue.uniqueId) {
          this.onUniqueIdChange(formValue.uniqueId)
          this.isSelectStudent = true;

        } else {
          this.isSelectStudent = false;
        }

      }
      console.log(res, "Admission data");

    }, err => {
      console.log(err);
    })
  }

  feeDeposit(admission: any) {
    this.router.navigate(['/', 'dashboard', 'fee_deposit', 'addFee', admission._id]);
  }

  onSelectionChange(event: any) {
    if (event.target.value) {
      console.log(event.target.value, "hello admin");

      const studentselectDatails = this.AdmissionData.filter((x) => x._id == event.target.value);

      this.studentselectDatails = studentselectDatails[0]
      console.log(this.studentselectDatails);
      this.isSelectStudent = true;
    }
  }

  onUniqueIdChange(uniqueId: any) {
    const studentselectDatails = this.AdmissionData.filter((x) => x.uniqueId == uniqueId);
    this.studentselectDatails = studentselectDatails[0];

  }

}








