import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global/global.service';
import jwt_decode from "jwt-decode";
import { PrivilageService } from '../privilage/privilage.service';
import *as featureInterface from '../../services/interface/interface';
import { SidenavService } from '../sidnav/sidenav.service';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  sliderAccess: any[] = [];
  list:any[] = featureInterface.sidebar;
  tokens:any
  constructor( private route:Router,
    private global:GlobalService,
  private privalageService:PrivilageService,
  private sidenavService:SidenavService
  ) { }
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
      this.route.navigate(['']);
      this.global.showToastErorr('Session Expired!');
    }
  }


  isDataLoaded:any=false;
  previlageListApiDatat(): Promise<any> {
    // return new Promise((resolve, reject) => {
    //   this.privalageService.previlageLst().subscribe(
    //     async (res) => {
    //       console.log(res);
  
    //       try {
    //         // Assuming filterList is an async function and returns a promise
    //         this.sliderAccess = await this.filterList(this.list, res.response[0].previleges);
    //         this.sidenavService.udateRealSideBarData(this.sliderAccess);
    //         resolve(this.sliderAccess); // Return the filtered access list
    //       } catch (error) {
    //         console.error('Error in filterList', error);
    //         reject(error); // Reject the promise if filterList fails
    //       }
    //     },
    //     (err) => {
    //       console.log(err);
    //       reject(err); // Reject if the API request fails
    //     }
    //   );
    // });

    if (this.isDataLoaded) {
      return Promise.resolve(this.sliderAccess); // Return the cached data if already loaded
    }
  
    this.isDataLoaded = true; // Set the flag to indicate data is loading
  
    return new Promise((resolve, reject) => {
      this.privalageService.previlageLst().subscribe(
        async (res) => {
          console.log(res);
  
          try {
            // Assuming filterList is an async function and returns a promise
            this.sliderAccess = await this.filterList(this.list, res.response[0].previleges);
            this.sidenavService.udateRealSideBarData(this.sliderAccess);
            resolve(this.sliderAccess); // Return the filtered access list
          } catch (error) {
            console.error('Error in filterList', error);
            reject(error); // Reject the promise if filterList fails
          }
        },
        (err) => {
          console.log(err);
          reject(err); // Reject if the API request fails
        }
      );
    });
  }

  filterList(list: any[], list2: any[]) {
    return list.filter(item => {
      const list2Item = list2.find(l2Item => l2Item.module === item.name);
      return list2Item ? list2Item.checked : false;
    });
  }
  
}
