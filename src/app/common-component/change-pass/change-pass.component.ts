import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../services/common/common.service';
import { GlobalService } from '../../services/global/global.service';
import { passwordMatchValidator } from './validators';
import { PrivilageService } from '../../services/privilage/privilage.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.css'
})
export class ChangePassComponent implements OnInit{

submitted:boolean=false;
  form:FormGroup;
  userList:any[]=[];
   // second method of multi select
   selectedItems:any[]=[];
   dropdownSettings={};

  submit:boolean=true;
  @Input() public user:any;
  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private privilageService:PrivilageService,
    private commonService:CommonService,

    private global:GlobalService
  ) { 
    this.form = this.fb.group({
      oldPass: ['', Validators.required],
      newPass: ['', Validators.required],
      cnfPass:['', Validators.required]
    },
    {
      validators: passwordMatchValidator()  // Apply custom validator to the form group
    });
  }

  ngOnInit(): void {}

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
    if(this.form.invalid){
      return;
    }
    this.submitted = false;
    const formData = {oldPassword:this.form.value.oldPass,newPassword:this.form.value.newPass,confPassword:this.form.value.cnfPass};

     this.privilageService.changePassword(formData).subscribe(res=>{

      // console.log('data update',res)
      if(res.success ){
        this.global.showToast(res.response);
        this.activeModal.close();
      }      

    },err=>{
      this.commonService.tokenOutOfValid(err);
      if(err.error.response == 'Old Password not match'){
        this.global.showToastErorr(err.error.response);
      }
      console.log(err);
    })

  }

  
}