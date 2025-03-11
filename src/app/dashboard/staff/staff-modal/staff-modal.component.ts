import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private activeModal: NgbActiveModal,
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
  }


  get f() {
    return this.staffForm.controls;
  }

  onFileChange(event: any) { }
  modalClose() {
    this.activeModal.close();
  }

}
