import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../services/common/common.service';
import { GlobalService } from '../../../services/global/global.service';
import { PrevoiusPaperService } from '../../../services/previousPaper/prevoius-paper.service';

@Component({
  selector: 'app-modalpreviouspaper',
  templateUrl: './modalpreviouspaper.component.html',
  styleUrl: './modalpreviouspaper.component.css'
})
export class ModalpreviouspaperComponent {
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

    private previousService:PrevoiusPaperService,
    private global:GlobalService
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      // pdf: ['', Validators.required],
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
    this.submit = true;
    console.log(this.form.value);
    if(this.user == 'Add'){
      // alert('add');
      this.addData();
      // console.log('form value',this.form.value);
    }else{
      // alert('edit');
      // const imageControl = this.form.get('pdf');
      // if (imageControl) {
      //   imageControl.setValidators([]); 
      //   imageControl.updateValueAndValidity();
      // }
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
  

const formData =  {name:this.form.value.name,status:this.form.value.status};

    this.previousService.previousCreate(formData).subscribe(res=>{
      // console.log('data update',res)
      this.submit = false;
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

    const formData = {name:this.form.value.name,status:this.form.value.status};
   
    const _id = this.patchData._id;
    this.previousService.previousUpdate(formData,_id).subscribe(res=>{
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
