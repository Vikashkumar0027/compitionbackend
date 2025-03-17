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
  @Input() public admissionId: any;


  staffForm: any;
  submitted: boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private staffService: StaffService,
    private globalService: GlobalService,
    private fb: FormBuilder
  ) {

  }
  ngOnInit(): void {
    this.staffForm = this.fb.group({
      staffName: ['', Validators.required],
      uniqueId: ['', Validators.required],
      dob: ['', Validators.required],
      fatherName: [''],
      gender: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      address: [''],
      primaryNumber: ['', Validators.required],
      secondaryNumber: [''],
      qualification: [''],
      teachingSubjects: [''],
      designation: [''],
      email: [''],
      experience: [''],
      basicSalary: [''],
      aadharNo: ['', Validators.required],
      panNo: [''],
      pfNo: [''],
      status: ['', Validators.required],
      photo: [''],
      lastSchool: [''],
      comments: [''],
      bankDetails: this.fb.group({
        bankName: [''],
        accountNumber: [''],
        branch: [''],
        ifscCode: ['']
      })
    });
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
      if (this.staffForm.value[key]) {
        formData.append(key, this.staffForm.value[key]);
      }
    }

    );
    // formData.append("studentImage", this.file);


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

  editData() {

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
