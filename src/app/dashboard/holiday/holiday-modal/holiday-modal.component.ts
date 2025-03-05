import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-holiday-modal',
  templateUrl: './holiday-modal.component.html',
  styleUrl: './holiday-modal.component.css'
})
export class HolidayModalComponent {

  form: FormGroup;
  submitted: boolean = false;


  @Input() public user:any
  @Input() holiList:[] = []
  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      name: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  onSubmit() {

  }

  get f() {
    return this.form.controls
  }

  modalClose() {
    this.activeModal.close();
  }

}
