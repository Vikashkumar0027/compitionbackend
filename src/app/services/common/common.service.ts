import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global/global.service';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  tokens:any
  constructor( private route:Router,
    private global:GlobalService) { }
  isLoggedIn(){
    return localStorage.getItem('token')!=null;   //it will return false otherWise its will be true
   }

   async jwtToken(){
    this.tokens =  localStorage.getItem('token')
      return jwt_decode(this.tokens);
   }

   async tokenOutOfValid(data:any){
    console.log(data);
    if(data.error.msg== 'Token is not valid'){
      localStorage.removeItem('token');
      this.route.navigate(['']);
      this.global.showToastErorr(data.error.msg);
    }
  }
}
