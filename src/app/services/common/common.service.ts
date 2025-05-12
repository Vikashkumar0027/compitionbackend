import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global/global.service';
import { PrivilageService } from '../privilage/privilage.service';
import *as featureInterface from '../../services/interface/interface';
import { SidenavService } from '../sidnav/sidenav.service';
import { BehaviorSubject } from 'rxjs';
import jwt_decode from "jwt-decode";
import * as CryptoJS from 'crypto-js';
import { LoginService } from '../login/login.service';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // private _tokenAdminType = new BehaviorSubject<any>(null);
  
  // get tokenAdminTyoe(){
  //   return this._tokenAdminType.asObservable();
  // }

  decryptedData:any;
  token:any;
  sliderAccess: any[] = [];
  list:any[] = featureInterface.sidebar;
  allSIdeModule:any[]= featureInterface.selectSideBar;
  tokens:any
  constructor( private route:Router,
    private global:GlobalService,
  private privalageService:PrivilageService,
  private sidenavService:SidenavService,
  private loginService:LoginService
  ) { }
// admiData:any
//   udateAdminType(val:any){
//     //updateSideBar
//     this.admiData = val;
//     this._tokenAdminType.next(val);
//    }


  isLoggedIn(){
    return localStorage.getItem('compytkns')!=null;   //it will return false otherWise its will be true
   }

   async jwtToken(){
    this.tokens =  localStorage.getItem('compytkns')
      return jwt_decode(this.tokens);
   }

   async tokenOutOfValid(data:any){
    console.log(data);
    if(data.error.message== 'Unauthorized Token !!'){
      localStorage.removeItem('compytkns');
      this.route.navigate(['./login']);
      this.global.showToastErorr('Session Expired!');
    }
  }


  isDataLoaded:any=false;
  previlageListApiDatat(): Promise<any> {
   

    if (this.isDataLoaded) {
      return Promise.resolve(this.sliderAccess); // Return the cached data if already loaded
    }
  
    this.isDataLoaded = true; // Set the flag to indicate data is loading


    this.token = localStorage.getItem('compytkns');
    this.loginService.udateToken( this.token);
    const encruKey ="thisismyCompetitionApplication";
    const bytes = CryptoJS.AES.decrypt(this.token, encruKey);
    this.decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    const decodedToken:any = jwt_decode(this.decryptedData);

  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.privalageService.previlageLst().subscribe((res) => {
          // console.log(res);
          // try {
            (decodedToken.data.type == "SubAdmin") ?
              this.sliderAccess =  this.filterList(this.list, res.response[0].previleges) :
              this.sliderAccess = this.list;
            this.sidenavService.udateRealSideBarData(this.sliderAccess);
            resolve(this.sliderAccess); // Return the filtered access list
          // } catch (error) {
          //   console.error('Error in filterList', error);
          //   reject(error); // Reject the promise if filterList fails
          // }
        },
        (err) => {
          console.log(err);
          this.tokenOutOfValid(err);
          reject(err); // Reject if the API request fails
        }
      ); 
      });
    });
  }

  filterList(list: any[], list2: any[]) {
    return list.filter(item => {
      const list2Item = list2.find(l2Item => l2Item.module === item.name);
      return list2Item ? list2Item.checked : false;
    });
  }
  
}
