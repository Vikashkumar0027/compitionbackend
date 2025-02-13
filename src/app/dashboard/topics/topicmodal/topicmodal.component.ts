import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../services/common/common.service';
import { GlobalService } from '../../../services/global/global.service';
import { TopicsService } from '../../../services/topics/topics.service';

@Component({
  selector: 'app-topicmodal',
  templateUrl: './topicmodal.component.html',
  styleUrl: './topicmodal.component.css'
})
export class TopicmodalComponent implements OnInit {
  submitted:boolean=false;
  form:FormGroup;
  userList:any[]=[];
   // second method of multi select
   selectedItems:any[]=[];
   dropdownSettings={};

  submit:boolean=true;
  @Input() public user:any;
  @Input() public patchData:any;
  @Input() public chapterId:any;
  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private commonService:CommonService,
    private topicService:TopicsService,
    private global:GlobalService
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      vdoid: ['', Validators.required],
      pdf: ['', Validators.required],
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
        vdoid: this.patchData.video,
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
      return;
    }
    // const data = this.form.value;
    console.log(this.form.value);
    let formData = new FormData();

formData.append('pdf', this.file); 
formData.append('name', this.form.value.name);
formData.append('video', this.form.value.vdoid);
formData.append('chapterId', this.chapterId);
formData.append('status', this.form.value.status);

    this.topicService.topicsCreate(formData).subscribe(res=>{

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
(this.file == undefined) ? formData.append('pdf', this.patchData.pdf) : formData.append('pdf', this.file);

formData.append('name', this.form.value.name);
formData.append('video', this.form.value.vdoid);
formData.append('chapterId', this.chapterId);
formData.append('status', this.form.value.status);
   
    const _id = this.patchData._id;
    this.topicService.topicsUpdate(formData,_id).subscribe(res=>{

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