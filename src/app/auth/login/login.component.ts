import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { GlobalService } from '../../services/global/global.service';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  islogin:boolean=false;
  submitted:boolean=false;
  form: FormGroup;
// inder@gmail.com
  id:any;
  loginData:any
  constructor(
    private fb: FormBuilder,
    private route:Router,
    private loginService:LoginService,
    private globalService:GlobalService,
    private commonService:CommonService
  ){
    this.form = this.fb.group({
      email:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required,Validators.minLength(3)])
    })
  }

  ngOnInit(): void {
      
  }

  get f(){
    return this.form.controls
  }

  login(){
    // this.route.navigate(['/','dashboard','home'])
    window.location.reload();
  }

  onSubmit(){
    this.submitted=true;
    if(this.form.invalid){
      this.globalService.showToastErorr('Please fill out all required fields.');
      return;
    }
    this.submitted=false;
       if(this.form.valid){
        const data = {
          email: this.form.value.email.trim(),
          password: this.form.value.password.trim()
        };
        this.loginService.login(data).subscribe(res=>{
        //  console.log(res);
        this.form.reset();
          if(res.success){
            this.islogin = true;
            localStorage.setItem('compytkns',res.response);
            this.loginService.udateToken(res.response);
            this.commonService.isDataLoaded = false;
            // this.route.navigate(['/','dashboard','home']);
            // this.route.navigateByUrl('/dashboard/home').then(() => {
            //     window.location.reload();
            //     });
              this.globalService.showToast('You are now logged in!');
              this.route.navigateByUrl('./dashboard/home');
              // setTimeout(() => {
              //   this.route.navigateByUrl('./dashboard/home')
              //   .then(() => {
              //         window.location.reload();
              //         });
              // },200);
          }
        },(err)=>{
          // this.globalService.showToastErorr(err.error.msg);
          (err?.status=="0")? this.globalService.showToastErorr('Check Internate!') : this.globalService.showToastErorr(err.error.message);
          
        })

        
         }
        
          // setTimeout(() => {
          //   this.submitted = false; 
          // }, 2000); 
  }



}
