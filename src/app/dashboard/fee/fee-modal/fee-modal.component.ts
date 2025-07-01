import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassService } from '../../../services/class/class.service';
import { GlobalService } from '../../../services/global/global.service';
import { CatFeeService } from '../../../services/cat_fee/cat-fee.service';

@Component({
  selector: 'app-fee-modal',
  templateUrl: './fee-modal.component.html',
  styleUrl: './fee-modal.component.css'
})
export class FeeModalComponent {
  form: FormGroup; // form data 
  submitted: boolean = false; // form condition
  isCustom: boolean = false;

  @Input() classList: any[] = [];
  @Input() public user: any // get data of fee component
  @Input() public patchData: any // get data of fee component


  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private cat_feeService: CatFeeService,
    private global: GlobalService
  ) {

    this.form = this.fb.group({
      class: ['', Validators.required],
      payment: ['', Validators.required],
      custom: [''],
      status: ['Active', Validators.required]
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
    this.patchDataFunction();
    // this.classService.classlist().subscribe(res => {
    //   this.classList = res.data;
    // })
  }


  patchDataFunction() {
    if (this.user == 'Edit') {

      const classFilter = this.classList.filter(x => x.className == this.patchData.name);
      console.log(classFilter);
      (classFilter.length) ? this.isCustom = false : this.isCustom = true;
      // console.log(this.user);
      const patch = {
        class: this.isCustom ? 'custom' : this.patchData.name,
        custom: this.patchData.name,
        payment: this.patchData.fee,
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
    console.log(this.form.value)
    // { "name": "test23", "fee": "100", "status": "active" }
    let formData = {
      name: this.isCustom ? this.form.value.custom : this.form.value.class,
      fee: this.form.value.payment,
      status: this.form.value.status
    }

    this.cat_feeService.feeAdd(formData).subscribe((res) => {
      if (res.success) {
        this.global.showToast(res.response);
        this.activeModal.close("Add");
      }
    }, err => {
      console.log(err);
    })

  }


  editData() {
    if (this.form.invalid) {
      return;
    }

    let formData = {
      name: this.isCustom ? this.form.value.custom : this.form.value.class,
      fee: this.form.value.payment,
      status: this.form.value.status
    }
    const _id = this.patchData._id;
    this.cat_feeService.feeEdit(formData, _id).subscribe((res) => {
      if (res.success) {
        this.global.showToast(res.response);
        this.activeModal.close('Edit');
      }
    }, (error) => {
      console.log(error);
      return null
    })

  }



  onSelectionChange(event: any) {
    console.log(event.target.value)
    if (event.target.value == 'custom') {
      this.isCustom = true;
      const customControl: any = this.form.get('custom');
      customControl.setValidators([Validators.required]);
      customControl.updateValueAndValidity();
    } else {
      const customControl: any = this.form.get('custom');
      customControl.setValidators([]);
      customControl.updateValueAndValidity();
      this.isCustom = false;

    }

  }


}