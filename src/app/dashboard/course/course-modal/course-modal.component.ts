import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from '../../../services/course/course.service';
import { CommonService } from '../../../services/common/common.service';
import { GlobalService } from '../../../services/global/global.service';


@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrl: './course-modal.component.css'
})
export class CourseModalComponent implements OnInit {
 
  submitted:boolean=false;
  form:FormGroup;
  userList:any[]=[];
   // second method of multi select
   selectedItems:any[]=[];
   dropdownSettings={};

  submit:boolean=false;
  @Input() public user:any;
  @Input() public patchData:any;
  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private couseService:CourseService,
    private commonService:CommonService,
    private global:GlobalService
  ) { 
    this.form = this.fb.group({
      title: ['', Validators.required],
      video_details: ['', Validators.required],
      sub_title: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
        this.maxTwoDigitsValidator
      ]],
      description: ['', Validators.required],
      type: ['', Validators.required],
      image: ['', Validators.required],
      status:  ['active', Validators.required],

    });
  }

  ngOnInit(): void {
   
    // this.getUserList();
    this.patchDataFunction();
  }

  // Custom validator to restrict to two decimal places
  maxTwoDigitsValidator(control: any) {
    const value = control.value;
    if (value) {
      // Regular expression to check the value
      const regex = /^(\d{1,2}(\.\d{0,2})?)?$/;
      
      if (!regex.test(value.toString())) {
        return { invalidDecimal: true };
      }
    }
    return null;
  }
 


  onDeSelectAll(items:any){
    // console.log(items);
  }

  patchDataFunction(){
    if(this.user == 'Edit'){
      console.log(this.user);

      // this.form.get('password')?.setValidators([]); // Clear validators for password image: this.patchData.status,

      const vdoDetail = this.patchData.video_details.join(',');
      const sub_Title = this.patchData.sub_title.join(',');

      const patch = {
        title: this.patchData.title,
        video_details: vdoDetail,
        sub_title: sub_Title,
        price: this.patchData.price,
        discount:this.patchData.discount,
        description: this.patchData.description,
        type: this.patchData.type,
        status: this.patchData.status,
      };
      this.form.patchValue(patch);
    }
  }

  assigntoPatching(userList:any){
  userList.forEach((element:any) => {
  this.patchData.assign_to.forEach((ele:any) => {
    if(element._id != ele._id){
      return;
    }else{
      element.isChecked = true;
    }
  })
        });
setTimeout(() => {
  console.log('userlist data',userList);
  this.userList = userList;
});
  }




  get f(){
    return this.form.controls
  }

  modalClose() {
    this.activeModal.close();
  }

  private file: any;
  onFileChange(event:any) {
    this.file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    
    let fileList: FileList = event.target.files;  
    let file: File = fileList[0];
 }

 onSubmit() {
    this.submitted = true;
    this.submit = true;
    console.log(this.form.value);
    // if(this.form.invalid){
    //   return;
    // }
    console.log(this.form.value);
    if(this.user == 'Add'){
      // alert('add');
      this.addData();
      // console.log('form value',this.form.value);
    }else{
      // alert('edit');
      const imageControl = this.form.get('image');
      if (imageControl) {
        imageControl.setValidators([]);  // Remove all validators
        imageControl.updateValueAndValidity();  // Revalidate the control
      }
      this.editData();

    }

  }

  addData(){
      if(this.form.invalid){
        this.submit = false;
      return;
    }
    // const data = this.form.value;
    const vdoDetail = this.form.value.video_details.split(',');
    const sub_title = this.form.value.sub_title.split(',');
    console.log(vdoDetail,sub_title)
let formData = new FormData();

(this.file == undefined) ? formData.append('image', '') : formData.append('image', this.file);

for (let i = 0; i < vdoDetail.length; i++) {
  formData.append(`video_details[]`, vdoDetail[i]);
  }
  for (let i = 0; i < sub_title.length; i++) {
  formData.append(`sub_title[]`, sub_title[i]);
  }

formData.append('title', this.form.value.title);
formData.append('price', this.form.value.price);
formData.append('discount', this.form.value.discount);
formData.append('type', this.form.value.type);
formData.append('description', this.form.value.description);
formData.append('status', this.form.value.status);

    this.couseService.courseCreate(formData).subscribe(res=>{
      this.submit = false;
      // console.log('data update',res)
      if(res.success ){
        this.global.showToast(res.response);
        this.activeModal.close('Add');
      }      

    },err=>{
      this.submit = false;
      this.commonService.tokenOutOfValid(err);
      console.log(err);
    })

  }

  editData(){
    if(this.form.invalid){
      this.submit = false;
      return;
    }
    // const data = this.form.value;
    console.log(this.form.value)
     const vdoDetail = this.form.value.video_details.split(',');
     const sub_title = this.form.value.sub_title.split(',');
let formData = new FormData();
(this.file == undefined) ? formData.append('image', this.patchData.image) : formData.append('image', this.file);

for (let i = 0; i < vdoDetail.length; i++) {
  formData.append(`video_details[]`, vdoDetail[i]);
  }
  for (let i = 0; i < sub_title.length; i++) {
  formData.append(`sub_title[]`, sub_title[i]);
  }
formData.append('title', this.form.value.title);

formData.append('price', this.form.value.price);
formData.append('discount', this.form.value.discount);
formData.append('type', this.form.value.type);
formData.append('description', this.form.value.description);
formData.append('status', this.form.value.status);
   
    const _id = this.patchData._id;
    this.couseService.courseUpdate(formData,_id).subscribe(res=>{
      this.submit = false;
      // console.log('data update',res)
      if(res.success){
        this.global.showToast(res.response);
        this.activeModal.close('Edit');
      }

    },err=>{
      this.submit = false;
      this.commonService.tokenOutOfValid(err)
      console.log(err)
    })
  }

}
