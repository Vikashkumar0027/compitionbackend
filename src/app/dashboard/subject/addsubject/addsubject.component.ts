import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from '../../../services/course/course.service';
import { CommonService } from '../../../services/common/common.service';
import { GlobalService } from '../../../services/global/global.service';
import { SubjectService } from '../../../services/subject/subject.service';

@Component({
  selector: 'app-addsubject',
  templateUrl: './addsubject.component.html',
  styleUrl: './addsubject.component.css'
})
export class AddsubjectComponent implements OnInit {
  submitted:boolean=false;
  form:FormGroup;
  userList:any[]=[];
   // second method of multi select
   selectedItems:any[]=[];
   dropdownSettings={};

  submit:boolean=true;
  @Input() public user:any;
  @Input() public patchData:any;
  @Input() public courseId:any;
  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private couseService:CourseService,
    private commonService:CommonService,
    private subjectService:SubjectService,
    private global:GlobalService
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
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

      // this.form.get('password')?.setValidators([]); // Clear validators for password image: this.patchData.status,

      const patch = {
        name: this.patchData.name,
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
    this.submit = false;
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
      return;
    }
    // const data = this.form.value;
    console.log(this.form.value);
    let formData = new FormData();

// (this.file == undefined) ? formData.append('image', '') : formData.append('image', this.file);

formData.append('image', this.file); 
formData.append('name', this.form.value.name);
formData.append('batchId', this.courseId);
formData.append('status', this.form.value.status);

    this.subjectService.subjectCreate(formData).subscribe(res=>{

      // console.log('data update',res)
      if(res.success ){
        this.global.showToast(res.response);
        this.activeModal.close('Add');
      }      

    },err=>{
      this.commonService.tokenOutOfValid(err);
      console.log(err);
    })

  }

  editData(){
    if(this.form.invalid){
      return;
    }
    // const data = this.form.value;
    console.log(this.form.value)
let formData = new FormData();
(this.file == undefined) ? formData.append('image', this.patchData.image) : formData.append('image', this.file);

formData.append('name', this.form.value.name);
formData.append('batchId', this.courseId);
formData.append('status', this.form.value.status);
   
    const _id = this.patchData._id;
    this.subjectService.subjectUpdate(formData,_id).subscribe(res=>{

      // console.log('data update',res)
      if(res.success){
        this.global.showToast(res.response);
        this.activeModal.close('Edit');
      }

    },err=>{
      this.commonService.tokenOutOfValid(err)
      console.log(err)
    })
  }
}
