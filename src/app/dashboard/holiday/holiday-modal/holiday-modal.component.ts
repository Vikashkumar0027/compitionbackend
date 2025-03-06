import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HolidayService } from '../../../services/holiday/holiday.service';
import { GlobalService } from '../../../services/global/global.service';

@Component({
  selector: 'app-holiday-modal',
  templateUrl: './holiday-modal.component.html',
  styleUrl: './holiday-modal.component.css'
})
export class HolidayModalComponent implements OnInit{

  form: FormGroup;
  submitted: boolean = false;


  @Input() holiList: [] = []
  @Input() public user: any
  @Input() public patchData:any
  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private holidayService: HolidayService,
    private globalService: GlobalService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      status: ['Active', Validators.required]
    })
  }

  ngOnInit(): void {
    this.patchDataFunction();
  }


  onSubmit() {
    (this.user == 'Add' ? this.addHoliday() : this.editHoliday())
  }


  addHoliday() {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;
    console.log(this.form.value)
    let formData = {
      holidayName: this.form.value.name,
      status: this.form.value.status,
      date: this.form.value.date,
    }

    this.holidayService.holidayAdd(formData).subscribe((res) => {
      if (res.success) {
        this.globalService.showToast(res.response);
        this.activeModal.close("Add");
      }
    }, err => {
      console.log(err);
    })

  }

  patchDataFunction() {
    if (this.user == 'Edit') {
      const patch  = {
        name: this.patchData.holidayName,
        date: this.patchData.date,
        status: this.patchData.status,
      };
      this.form.patchValue(patch);
    }
  }
  editHoliday() {
    if (this.form.invalid) {
      return;
    }

    let formData = {
      holidayName: this.form.value.name,
      status: this.form.value.status,
      date: this.form.value.date
    }
    const _id = this.patchData._id;
    this.holidayService.holidayUpdate(formData, _id).subscribe((res) => {
      if (res.success) {
        this.globalService.showToast(res.response);
        this.activeModal.close('Edit');
      }
    }, (error) => {
      console.log(error);
      return null
    })
  }

  get f() {
    return this.form.controls
  }

  modalClose() {
    this.activeModal.close();
  }

}
