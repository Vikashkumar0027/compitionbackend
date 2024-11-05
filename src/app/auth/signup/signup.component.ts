import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup/signup.service';
import { GlobalService } from '../../services/global/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  submitted:boolean=false;
  form: FormGroup;
  constructor(
    private signupService:SignupService,
    private fb: FormBuilder,
    private global:GlobalService,
    private router:Router
  ){
    this.form = this.fb.group({
      email:new FormControl('',[Validators.required]),
      userName:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required,Validators.minLength(3)])
    }) 
  }

  ngOnInit(): void {
    
  }

  get f(){
    return this.form.controls
  }

  onSubmit(){
    this.submitted=true;
    if(this.form.invalid){
      this.global.showToastErorr('Invalid Form')
      return;
    }

    const formData = {
      name:this.form.value.userName,
      email:this.form.value.email,
      password:this.form.value.password
    };

    // this.signupService.addCompany(formData).subscribe(res=>{
    //   console.log(res);
    //   if(res.success){
    //     this.global.showToast(res.message);
    //     this.router.navigateByUrl('/login')
    //   }else{
    //     this.global.showToastErorr('Something went Wrong');
    //   }
    // },err=> {
    //   this.global.showToastErorr('Something went Wrong');
    //   console.log(err);
    // })
  }


}
