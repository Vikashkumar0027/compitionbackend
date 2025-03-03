import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../services/common/common.service';
import { GlobalService } from '../../../services/global/global.service';
import { BannerService } from '../../../services/banner/banner.service';

@Component({
  selector: 'app-banner-modal',
  templateUrl: './banner-modal.component.html',
  styleUrl: './banner-modal.component.css'
})
export class BannerModalComponent implements OnInit {
submitted:boolean=false;
  form:FormGroup;
  userList:any[]=[];
   // second method of multi select
   selectedItems:any[]=[];
   dropdownSettings={};

  submit:boolean=false;
  @Input() public user:any;
  @Input() public patchData:any;
  @Input() public testOnlineData:any;
  @Input() public coursData:any;
  // @Input() public subjectId:any;
  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private commonService:CommonService,
    private global:GlobalService,
    private bannerService:BannerService
  ) { 
    this.form = this.fb.group({
      title: ['', Validators.required],
      bannerType: ['', Validators.required],
      courseId: [''],
      testId: [''],
      thumbnail: ['', Validators.required],
      status:['active', Validators.required]
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
      console.log(this.patchData);

      // this.form.get('password')?.setValidators([]); // Clear validators for password image: this.patchData.status,

      const patch = {
        title: this.patchData.title,
        bannerType: this.patchData.bannerType,
        courseId: this.patchData.courseId,
        testId: this.patchData.testId,
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
    if(this.user == 'Add'){
      // alert('add');
      this.addData();
      // console.log('form value',this.form.value);
    }else{
      // alert('edit');
      const imageControl = this.form.get('pdf');
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
    console.log(this.form.value);
    let formData = new FormData();

// (this.file == undefined) ? formData.append('image', '') : formData.append('image', this.file);

formData.append('thumbnail', this.file); 
formData.append('title', this.form.value.title);
formData.append('bannerType', this.form.value.bannerType);

(this.isBannerCourse === 'course') 
  ? formData.append('courseId', this.form.value.courseId) 
  : (this.isBannerCourse === 'testSeries') 
    ? formData.append('testId', this.form.value.testId) 
    : null;

formData.append('status', this.form.value.status);

    this.bannerService.bannerAdd(formData).subscribe(res=>{
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
let formData = new FormData();
(this.file == undefined) ? formData.append('thumbnail', this.patchData.pdf) : formData.append('thumbnail', this.file);

// formData.append('thumbnail', this.file); 
formData.append('title', this.form.value.title);
formData.append('bannerType', this.form.value.bannerType);

(this.isBannerCourse === 'course') 
  ? formData.append('courseId', this.form.value.courseId) 
  : (this.isBannerCourse === 'testSeries') 
    ? formData.append('testId', this.form.value.testId) 
    : null;

formData.append('status', this.form.value.status);
   
    const _id = this.patchData._id;
    this.bannerService.bannerUpdate(formData,_id).subscribe(res=>{
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

  isBannerCourse:any='none';

  onSelectionChange(event: any) {
    console.log(event.target.value);
    this.isBannerCourse = event.target.value;

  //  if(event.target.value == ''){

  //  }else{ courseId: ['', Validators.required],
      // testId: ['', Validators.required],

  //  }

if(event.target.value == 'course'){
  const courseId:any = this.form.get('courseId');
  const testId:any = this.form.get('testId');

  courseId.setValidators([Validators.required]);  
  courseId.updateValueAndValidity();

  testId.setValidators([]);  
  testId.updateValueAndValidity();
}else if(event.target.value == 'testSeries'){

  const testId:any = this.form.get('testId');
  const courseId:any = this.form.get('courseId');

  testId.setValidators([Validators.required]);  
  testId.updateValueAndValidity();

  courseId.setValidators([]);  
  courseId.updateValueAndValidity();
}else{
  const testId:any = this.form.get('testId');
  const courseId:any = this.form.get('courseId');

  testId.setValidators([]);  
  testId.updateValueAndValidity();

  courseId.setValidators([]);  
  courseId.updateValueAndValidity();
}

  }


}
