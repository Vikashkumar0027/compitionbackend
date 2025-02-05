import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../services/common/common.service';
import { OnlineTestService } from '../../../services/onlineTest/online-test.service';
import { GlobalService } from '../../../services/global/global.service';

@Component({
  selector: 'app-modal-batch',
  templateUrl: './modal-batch.component.html',
  styleUrl: './modal-batch.component.css'
})
export class ModalBatchComponent {
  submitted:boolean=false; 
  // FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(''),
  //   trxId: new FormControl(''),
  //   course: new FormControl(''),
  
  // });
  form:FormGroup = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    discount: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
    status: new FormControl(''),
    });
    subForm:FormGroup = new FormGroup({
    name: new FormControl(''),
    status: new FormControl(''),
    });
  userList:any[]=[];
   // second method of multi select
   selectedItems:any[]=[];
   dropdownSettings={};

  submit:boolean=false;
  @Input() public user:any;
  @Input() public patchData:any;
  @Input() public onlineModalType:any;
  @Input() public testCourseId:any;
  // @Input() public subjectId:any;
  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    // private couseService:CourseService,
    private commonService:CommonService,

    private onlineService:OnlineTestService,
    private global:GlobalService
  ) { 
    // this.batchForm();
   
  }

  ngOnInit(): void {
    if(this.onlineModalType == 'batch'){
      this.batchForm();
    }else if(this.onlineModalType == 'subject'){
      this.subjectForm();
    }
    // this.getUserList();
    this.patchDataFunction();
  }

  get f(){
    return this.form.controls
  }
  get fs(){
    return this.subForm.controls
  }



  batchForm(){
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      status:['active', Validators.required]
    });
  }
//  "batchId":"67347ed2da84bf9035d1b0c5",
  subjectForm(){
    this.subForm = this.fb.group({
      name: ['', Validators.required],
      status:['active', Validators.required]
    });
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
if(this.onlineModalType == 'subject'){
  this.subForm.patchValue({
    name: this.patchData.name,
    status: this.patchData.status,
  })
}else{


      

      const patch = {
        title: this.patchData.name,
        type: this.patchData.type,
        price: this.patchData.amount,
        discount:this.patchData.discount,
        description: this.patchData.description,
        status: this.patchData.status,
      };
      this.form.patchValue(patch);
    }
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
      this.addData();
    }else{
      this.editData();
    }

  }

  onSubjectSubmit() {
    this.submitted = true;
    this.submit = true;
    console.log(this.subForm.value);
    if(this.user == 'Add'){
      this.addSubjectData();
    }else{
      this.editSubjetData();
    }

  }


  addData(){
      if(this.form.invalid){
        this.submit = false;
      return;
    }
    console.log(this.form.value);
    const formData = {
      name:this.form.value.title,
      type:this.form.value.type,
      amount:this.form.value.price,
      discount:this.form.value.discount,
      description: this.form.value.description,
      status:this.form.value.status}; 
    this.onlineService.batchTestAdd(formData).subscribe(res=>{
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
// let formData = new FormData();
// (this.file == undefined) ? formData.append(this.form.value.image, this.patchData.pdf) : formData.append('image', this.file);
// formData.append('title', this.form.value.title);
// formData.append('status', this.form.value.status);

const formData =  {
  name:this.form.value.title,
  type:this.form.value.type,amount:this.form.value.price,discount:this.form.value.discount,description: this.form.value.description, status:this.form.value.status} ; 
   
    const _id = this.patchData._id;
    this.onlineService.batchTestUpdate(formData,_id).subscribe(res=>{
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

  addSubjectData(){
    if(this.subForm.invalid){
      this.submit = false;
    return;
  }
  console.log(this.subForm.value);
  const subFormData ={name:this.subForm.value.name,batchId:this.testCourseId,status:this.subForm.value.status};
  this.onlineService.subjectTestAdd(subFormData).subscribe(res=>{
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

  editSubjetData(){
    if(this.subForm.invalid){
      this.submit = false;
      return;
    }
    // const data = this.form.value;
    console.log(this.subForm.value);
// let formData = new FormData();
// (this.file == undefined) ? formData.append(this.form.value.image, this.patchData.pdf) : formData.append('image', this.file);
// formData.append('title', this.form.value.title);
// formData.append('status', this.form.value.status);

const formData = {name:this.subForm.value.name,batchId:this.testCourseId,status:this.subForm.value.status}; 
   
    const _id = this.patchData._id;
    this.onlineService.subjectTestUpdate(formData,_id).subscribe(res=>{
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
 


  onPercentageTwoDigit() {
    let discount = this.form.get('discount')?.value; // Get the current value of the discount
  
    // Ensure the value is a string for proper manipulation
    discount = discount ? discount.toString() : '';
  
    // Remove non-numeric characters
    discount = discount.replace(/[^0-9]/g, '');
  
    // Limit the length to 2 digits
    discount = discount.substring(0, 2);
  
    // Update the form control's value
    this.form.get('discount')?.setValue(discount);
  }
}
