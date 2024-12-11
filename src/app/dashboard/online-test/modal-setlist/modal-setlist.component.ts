import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../services/common/common.service';
import { OnlineTestService } from '../../../services/onlineTest/online-test.service';
import { GlobalService } from '../../../services/global/global.service';

@Component({
  selector: 'app-modal-setlist',
  templateUrl: './modal-setlist.component.html',
  styleUrl: './modal-setlist.component.css'
})
export class ModalSetlistComponent {
  submitted:boolean=false;
  form:FormGroup;
  userList:any[]=[];
   // second method of multi select
   selectedItems:any[]=[];
   dropdownSettings={};

  submit:boolean=true;
  @Input() public user:any;
  @Input() public patchData:any;
  @Input() public subjectId:any;
  // @Input() public subjectId:any;
  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    // private couseService:CourseService,
    private commonService:CommonService,

    private onlineTestService:OnlineTestService,
    private global:GlobalService
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      time: ['', Validators.required],
      marks: ['', Validators.required],
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
        time: this.patchData.totalTime,
        marks: this.patchData.marksPerQues,
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


 onSubmit() {
    this.submitted = true;
    this.submit = false;
    console.log(this.form.value);
    if(this.user == 'Add'){
      // alert('add');
      this.addData();
      // console.log('form value',this.form.value);
    }else{
      this.editData();

    }

  }

  addData(){
      if(this.form.invalid){
      return;
    }
    // const data = this.form.value;
    console.log(this.form.value);

    const formData = { name: this.form.value.name, totalTime:this.form.value.time, marksPerQues:this.form.value.marks, subjectId:this.subjectId, status:this.form.value.status };

    this.onlineTestService.setTestAdd(formData).subscribe(res=>{

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

    const formData = { name: this.form.value.name, totalTime:this.form.value.time, marksPerQues:this.form.value.marks, subjectId:this.subjectId, status:this.form.value.status };
   
    const _id = this.patchData._id;
    this.onlineTestService.setTestUpdate(formData,_id).subscribe(res=>{

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
