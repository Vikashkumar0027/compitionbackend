import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassService } from '../../../services/class/class.service';
import { GlobalService } from '../../../services/global/global.service';

@Component({
  selector: 'app-class-modal',
  templateUrl: './class-modal.component.html',
  styleUrl: './class-modal.component.css'
})
export class ClassModalComponent implements OnInit {

  form: FormGroup; // form data 
  submitted: boolean = false; // form condition 


  @Input() public user: any // get data of class component
  @Input() public patchData: any // get data of class component
  @Input() public classId: any // get data of class component

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private classService: ClassService,
    private global: GlobalService
  ) {

    this.form = this.fb.group({
      className: ['', Validators.required],
      status: ["Active", Validators.required]
    })

  }

  // modal close function start

  modalClose() {
    this.activeModal.close();
  }

  // modal close function end

  get f() {
    return this.form.controls
  }


  ngOnInit(): void {
    this.patchDataFunction()
  }


  patchDataFunction() {
    if (this.user == 'Edit') {
      console.log(this.user);

      const patch = {
        className: this.patchData.className,
        status: this.patchData.status,
      };
      this.form.patchValue(patch);
    }
  }


  onSubmit() {
    this.submitted = true;
    this.user == "Add" ? this.addData() : this.editData();
  }

  addData() {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;

    let formData = {
      className: this.form.value.className,
      status: this.form.value.status
    }

    this.classService.createClass(formData).subscribe((res) => {
      if (res.success) {
        this.global.showToast(res.response);
        this.activeModal.close("Add")

      }
    })

  }


  editData() {
    if(this.form.invalid) {
      return;
    }

    let formData = {
      className: this.form.value.className,
      status: this.form.value.status
    }

    const _id = this.patchData._id;
    this.classService.editByiD(formData, _id).subscribe((res) => {
      if(res.success) {
        this.global.showToast(res.massage);
        this.activeModal.close('Edit');
      }
    }, (error) => {
      console.log(error);
      return null
    })
  }



}
