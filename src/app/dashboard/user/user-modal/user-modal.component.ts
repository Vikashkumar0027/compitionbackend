import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../services/common/common.service';
import { UserService } from '../../../services/user/user.service';
import { GlobalService } from '../../../services/global/global.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent {
  submitted:boolean=false;
  form:FormGroup;
  userList:any[]=[];
   // second method of multi select
   selectedItems:any[]=[];
   dropdownSettings={};

  submit:boolean=false;
  @Input() public user:any;
  @Input() public patchData:any;
  // @Input() public subjectId:any;
  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    // private couseService:CourseService,
    private commonService:CommonService,

    private userService:UserService,
    private global:GlobalService
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      number: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', Validators.required],
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

      // this.form.get('password')?.setValidators([]); // Clear validators for password image: this.patchData.status,formData.append('name', this.form.value.name);

      const patch = {
        name: this.patchData.name,
        email: this.patchData.email,
        number: this.patchData.number,
        status: this.patchData.status,
        gender: this.patchData?.gender,
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
      const imageControl = this.form.get('image');
      const passControl = this.form.get('password');
      if (imageControl && passControl) {
        imageControl.setValidators([]);  
        imageControl.updateValueAndValidity();
        passControl.setValidators([]);  
        passControl.updateValueAndValidity();
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

formData.append('image', this.file); 
formData.append('name', this.form.value.name);
formData.append('email', this.form.value.email);
formData.append('number', this.form.value.number);
formData.append('password', this.form.value.password);
formData.append('status', this.form.value.status);
formData.append('gender', this.form.value.gender);

    this.userService.userAdd(formData).subscribe(res=>{
      this.submit = false;
      // console.log('data update',res)
      if(res.success ){
        this.global.showToast(res.response);
        this.activeModal.close('Add');
      }      

    },err=>{
      this.submit = false;
      this.commonService.tokenOutOfValid(err);
      this.global.showToastErorr(err.error.response);
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
(this.file == undefined) ? formData.append('image', this.patchData.image) : formData.append('image', this.file);
formData.append('name', this.form.value.name);
formData.append('email', this.form.value.email);
formData.append('number', this.form.value.number);
formData.append('gender', this.form.value.gender);
formData.append('status', this.form.value.status);
   
    const _id = this.patchData._id;
    this.userService.userUpdate(formData,_id).subscribe(res=>{
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
