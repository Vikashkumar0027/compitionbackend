import { Component, Input } from '@angular/core';
import { LibrarySubCriptionService } from '../../../services/librarySubscription/library-sub-cription.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../services/global/global.service';

@Component({
  selector: 'app-lib-sub-modal',
  templateUrl: './lib-sub-modal.component.html',
  styleUrl: './lib-sub-modal.component.css'
})
export class LibSubModalComponent {
 form: FormGroup; // form data 
  submitted: boolean = false; // form condition
  isCustom: boolean = false;

  // @Input() classList: any[] = [];
  @Input() public user: any // get data of fee component
  @Input() public patchData: any // get data of fee component


  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private libSubscriptionServ:LibrarySubCriptionService,
    private global: GlobalService
  ) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['', Validators.required],
      status: ['active', Validators.required]
    })

  }

  // modal close function start

  modalClose() {
    this.activeModal.close();
  }

  // modal close function end

  get f() {
    return this.form.controls;
  }


  ngOnInit(): void {
    this.patchDataFunction();
    // this.classService.classlist().subscribe(res => {
    //   this.classList = res.data;
    // })
  }


  patchDataFunction() {
    if (this.user == 'Edit') {
      // console.log(this.user);
      const patch = {
        name: this.patchData.name,
        price: this.patchData.price,
        duration: this.patchData.duration,
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
    
    let formData = { name:this.form.value.name, price:this.form.value.price, duration:this.form.value.duration, status: this.form.value.status };
  

    this.libSubscriptionServ.librarySubAdd(formData).subscribe((res) => {
      if(res.success) {
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

    let formData = { name:this.form.value.name, price:this.form.value.price, duration:this.form.value.duration, status: this.form.value.status };
  
    const _id = this.patchData._id;
    this.libSubscriptionServ.librarySubUpdate(formData, _id).subscribe((res) => {
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
    if(event.target.value == 'custom') {
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
