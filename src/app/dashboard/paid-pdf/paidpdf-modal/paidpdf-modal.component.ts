import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../services/common/common.service';
import { GlobalService } from '../../../services/global/global.service';
import { PaidpdfService } from '../../../services/paidpdf/paidpdf.service';

@Component({
  selector: 'app-paidpdf-modal',
  templateUrl: './paidpdf-modal.component.html',
  styleUrl: './paidpdf-modal.component.css'
})
export class PaidpdfModalComponent {
 submitted: boolean = false;
  form: FormGroup;
  userList: any[] = [];
  submit: boolean = false;
  @Input() public user: any;
  @Input() public patchData: any;

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private commonService: CommonService,
    private global: GlobalService,
    // private bannerService: BannerService
    private paidPdfSer:PaidpdfService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', [Validators.required,Validators.pattern('^[0-9]{2}$')]],
      thumbnail: ['', Validators.required],
      pdf: ['', Validators.required],
      status: ['active', Validators.required]
    });
  }


  ngOnInit(): void {

    // this.getUserList();
    this.patchDataFunction();
  }

  // Custom validator to restrict to two decimal places
  // maxTwoDigitsValidator(control: any) {
  //   const value = control.value;
  //   if (value) {
  //     // Regular expression to check the value
  //     const regex = /^(\d{1,2}(\.\d{0,2})?)?$/;

  //     if (!regex.test(value.toString())) {
  //       return { invalidDecimal: true };
  //     }
  //   }
  //   return null;
  // }






  patchDataFunction() {
    if (this.user == 'Edit') {
      const patch = {
        title: this.patchData.title,
        description: this.patchData.description,
        price: this.patchData?.mrp,
        discount: this.patchData?.discount,
        status: this.patchData.status,
      };
      this.form.patchValue(patch);
    }
  }

  assigntoPatching(userList: any) {
    userList.forEach((element: any) => {
      this.patchData.assign_to.forEach((ele: any) => {
        if (element._id != ele._id) {
          return;
        } else {
          element.isChecked = true;
        }
      })
    });
    setTimeout(() => {
      console.log('userlist data', userList);
      this.userList = userList;
    });
  }




  get f() {
    return this.form.controls
  }

  modalClose() {
    this.activeModal.close();
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
  private file1: any;
  onFileChangePdf(event: any) {
    this.file1 = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
      }
      reader.readAsDataURL(event.target.files[0]);
    }

    let fileList: FileList = event.target.files;
    let file1: File = fileList[0];
  }

  onSubmit() {
    this.submitted = true;
    this.submit = true;
    console.log(this.form.value);
    if (this.user == 'Add') {
    
      this.addData();
     
    } else {
      // alert('edit');
      const image = this.form.get('thumbnail');
      const pdf = this.form.get('pdf');
      if(image && pdf) {
        image.setValidators([]); 
        image.updateValueAndValidity(); 

        pdf.setValidators([]);  
        pdf.updateValueAndValidity(); 
      }
      this.editData();
    }
  }


  addData() {
    if (this.form.invalid) {
      this.submit = false;
      return;
    }
    // const data = this.form.value;
    console.log(this.form.value);
    let formData = new FormData();

    // (this.file == undefined) ? formData.append('image', '') : formData.append('image', this.file);

    formData.append('thumbnail', this.file);
    formData.append('pdf', this.file1);
    formData.append('title', this.form.value.title);
    formData.append('description', this.form.value.description);
    formData.append('mrp', this.form.value.price);
    formData.append('discount', this.form.value.discount);
    formData.append('status', this.form.value.status);

    this.paidPdfSer.pdfAdd(formData).subscribe(res => {
      this.submit = false;
      // console.log('data update',res)
      if (res.success) {
        this.global.showToast(res.response);
        this.activeModal.close('Add');
      }

    }, err => {
      this.submit = false;
      this.commonService.tokenOutOfValid(err);
      console.log(err);
    })

  }

  editData() {
    // if(!this.form.valid) {
    //   this.submit = false;
    //   return;
    // }
     if (!this.form.value.title || !this.form.value.description || !this.form.value.title || !this.form.value.price || !this.form.value.discount || !this.form.value.status ) {
    this.submit = false;
    return;
  }
    // const data = this.form.value;
    console.log(this.form.value)
    let formData = new FormData();
    (this.file == undefined) ? formData.append('thumbnail', this.patchData.thumbnail) : formData.append('thumbnail', this.file);
    (this.file1 == undefined) ? formData.append('pdf', this.patchData.pdf) : formData.append('pdf', this.file1);

    formData.append('title', this.form.value.title);
    formData.append('description', this.form.value.description);
    formData.append('mrp', this.form.value.price);
    formData.append('discount', this.form.value.discount);
    formData.append('status', this.form.value.status);
 

    const _id = this.patchData._id;
    this.paidPdfSer.pdfUpdate(formData, _id).subscribe(res => {
      this.submit = false;
      // console.log('data update',res)
      if (res.success) {
        this.global.showToast(res.response);
        this.activeModal.close('Edit');
      }

    }, err => {
      this.submit = false;
      this.commonService.tokenOutOfValid(err)
      console.log(err)
    })
  }

 

}
