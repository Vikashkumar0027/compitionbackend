import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassService } from '../../../services/class/class.service';
import { GlobalService } from '../../../services/global/global.service';

@Component({
  selector: 'app-fee-modal',
  templateUrl: './fee-modal.component.html',
  styleUrl: './fee-modal.component.css'
})
export class FeeModalComponent {
  form: FormGroup; // form data 
  submitted: boolean = false; // form condition
  isCustom: boolean = false;

  classList: any[] = [
    { className: "12th", status: "Active" },
    { className: "11th", status: "Active" },
    { className: "10th", status: "Active" },
    { className: "9th", status: "Active" },
  ];


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
      class: ['', Validators.required],
      payment: ['', Validators.required],
      status: ['', Validators.required]
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
    this.classService.classlist().subscribe(res => {
      this.classList = res.data;
    })
  }


  patchDataFunction() {
    if (this.user == 'Edit') {
      console.log(this.user);

      const patch = {
        class: this.patchData.class,
        payment: this.patchData.payment,
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
      class: this.form.value.class,
      payment: this.form.value.payment,
      status: this.form.value.status
    }
    // this.activeModal.close("Add");
    this.activeModal.close(formData);
    this.form.reset();


    // this.classService.createClass(formData).subscribe((res) => {
    // if (res.success) {
    //   this.global.showToast(res.massage);
    //   this.activeModal.close("Add")
    //   this.classList.push(res.data)
    // }
    // })

  }


  editData() {
    if (this.form.invalid) {
      return;
    }

    let formData = {
      class: this.form.value.class,
      payment: this.form.value.payment,
      status: this.form.value.status
    }

    const _id = this.patchData._id;

    this.classService.editByiD(formData, _id).subscribe((res) => {
      if (res.success) {
        this.global.showToast(res.massage);
        this.activeModal.close('Edit');
      }
    }, (error) => {
      console.log(error);
      return null
    })

  }

  selectedOption: string = '';
  customValue: string = '';
  onSelectionChange(event: any) {
    this.isCustom = event.target.value === ' ';
  }

  addCustomOption() {
    if (this.customValue.trim()) {
      this.classList.push(this.customValue);
      this.selectedOption = this.customValue;
      this.isCustom = false;
      this.customValue = '';
    }
  }


}