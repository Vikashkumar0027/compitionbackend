import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffService } from '../../../services/staff/staff.service';
import { GlobalService } from '../../../services/global/global.service';

@Component({
  selector: 'app-staff-modal',
  templateUrl: './staff-modal.component.html',
  styleUrl: './staff-modal.component.css'
})
export class StaffModalComponent implements OnInit {
  @Input() public user: any;
  @Input() public patchData: any;
  @Input() public staffId: any;


  staffForm: any;
  submitted: boolean = false;
  totalStaff:any;

  constructor(
    private activeModal: NgbActiveModal,
    private staffService: StaffService,
    private globalService: GlobalService,
    private fb: FormBuilder
  ) {
// console.log(this.patchData, "StaffList");
  }
  ngOnInit(): void {
    this.staffForm = this.fb.group({
      staffName: ['', Validators.required],
      husbandName: [''],
      dob: ['', Validators.required],
      fatherName: [''],
      gender: [''],
      dateOfJoining: [''],
      address: [''],
      primaryNumber: ['', Validators.required],
      secondaryNumber: [''],
      qualification: [''],
      teachingSubject: [''],
      designation: [''],
      email: [''],
      experience: [''],
      basicSalary: [''],
      adharNo: [''],
      pan: [''],
      pfNo: [''],
      status: ['Active'],
      photo: [''],
      lastSchool: [''],
      // comment: [''],
      bankName: [''],
      accountNo: [''],
      branch: [''],
      ifsc: ['']

    });

    this.patchDataFunction();
  }

  onSubmit() {
    console.log(this.staffForm.value);
    this.user == "Add" ? this.addData() : this.editData();
  }

  addData() {
    if (this.staffForm.invalid) {
      this.submitted = true;
      return;
    }

    this.submitted = false;
    let formData: any = new FormData();

    Object.keys(this.staffForm.value).forEach((key) => {
      console.log(key);
      if (key == 'photo') {
        formData.append("image", this.file);
      } else {
        if (this.staffForm.value[key]) {
          formData.append(key, this.staffForm.value[key]);
        }
      }
    }

    );

    if (formData) {
      this.staffService.staffAdd(formData).subscribe((res) => {
        if (res.success) {
          console.log(formData.value, "response value");
          this.globalService.showToast(res.response);
          this.activeModal.close('Add');
        }
      }, error => {
        console.log(error);
      })
    }
  }

  getStaff() {

    this.staffService.staffList().subscribe((res) => {
      if (res.success) {
        this.totalStaff = res.response;
        console.log("Totals Staff", this.totalStaff);
      }

      console.log(res.data, "response data class list");
    }, (error) => {
      console.log(error, "data is not patch ");
      return null
    })


  }



  editData() {
      if (this.staffForm.invalid) {
        return;
      }
  
      let staffData: any = new FormData();
  
      Object.keys(this.staffForm.value).forEach((key) => {
        let value = this.staffForm.value[key];
  
        // Check if classId is an object, then send only its _id
        if (key == 'photo' && value?._id) {
          staffData.append(key, value._id);
        } else if (value) {
          staffData.append(key, value);
        }
      });
  
      (this.file == undefined)
        ? staffData.append('image', this.patchData.image)
        : staffData.append('image', this.file);
  
      this.staffService.staffUpdate(staffData, this.staffId).subscribe(
        (res) => {
          if (res.success) {
            this.globalService.showToast(res.response);
            this.activeModal.close('Edit');
          }
        }, (error) => {
          console.log(error);
        }
      );
  }


  patchDataFunction() {
    if (this.user == 'Edit') {
      this.getStaff();
      if (this.patchData) {

        console.log(this.patchData, "patch data ")
        Object.keys(this.patchData).forEach((key) => {
          if (this.staffForm.controls[key]) {
            this.staffForm.controls[key].setValue(this.patchData[key]);
          }
        });
      }

    }
  }

  get f() {
    return this.staffForm.controls;
  }

  private file: any;
  onFileChange(event: any) {
    this.file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
      }
      reader.readAsDataURL(event.target.files[0]);
    }

    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
  }
  modalClose() {
    this.activeModal.close();
  }

}
