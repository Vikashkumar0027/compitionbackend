import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';
import { CommonService } from '../../services/common/common.service';
import { PrivilageService } from '../../services/privilage/privilage.service';
import { SidenavService } from '../../services/sidnav/sidenav.service';
// import * as CryptoJS from 'crypto-js';
// import jwt_decode from 'jwt-decode';

// import *as featureInterface from '../../services/interface/interface';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {

  data:any={};
  @Input() sideNavStatus: boolean=true;

  // subscribeList:any[]=[
  //   {number:'1',name:'Dashboard',icon:'fa-solid fa-house', url: '/dashboard/home'},
  //   {number:'2',name:'Project',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/job'},
  //   {number:'3',name:'Client',icon:'fa-sharp fa-solid fa-user', url: '/dashboard/client'},
  //   {number:'15',name:'Template',icon:'fa-regular fa-file', url: '/dashboard/template'},
  //   {number:'4',name:'Site',icon:'fa-solid fa-location-dot', url: '/dashboard/site'},
  //   // {number:'3',name:'Lab',icon:'fa-solid fa-flask-vial', url: '/dashboard/lab'},
  //   {number:'5',name:'Laboratory',icon:'fa-solid fa-flask-vial', url: '/dashboard/laboratory'},
  //   {number:'6',name:'Report',icon:'fa-regular fa-file', url: '/dashboard/report'},
  
  //   {number:'7',name:'Sales',icon:'fa-solid fa-hand-holding-dollar', url: '/dashboard/sales'},
  //   {number:'8',name:'Calender',icon:'fa-regular fa-calendar', url: '/dashboard/calender'},
  //   // {number:'3',name:'Selected Tamplate',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/selected_tamplate'},
  //   {number:'9',name:'User',icon:'fa-sharp fa-solid fa-user-group', url: '/dashboard/user'},
  //   {number:'10',name:'Group',icon:'fa-sharp fa-solid fa-g', url: '/dashboard/group'},
  //   {number:'11',name:'Air-Monitoring',icon:'fas fa-calculator', url: '/dashboard/airmonitoring'},
  //   {number:'12',name:'Help & Support',icon:'fa-solid fa-handshake-angle', url: '/dashboard/support'},

  //   {number:'13',name:'Subscription',icon:'fas fa-dollar-sign', url: '/dashboard/subscription'},

    
  // ];
  // adminList:any[]=[
  //   {number:'1',name:'Dashboard',icon:'fa-solid fa-house', url: '/dashboard/home'},
  //   {number:'2',name:'Project',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/job'},
  //   {number:'3',name:'Client',icon:'fa-sharp fa-solid fa-user', url: '/dashboard/client'},
  //   {number:'15',name:'Template',icon:'fa-regular fa-file', url: '/dashboard/template'},
  //   {number:'13',name:'Company',icon:'fas fa-building', url: '/dashboard/company'},
  //   {number:'4',name:'Site',icon:'fa-solid fa-location-dot', url: '/dashboard/site'},
  //   // {number:'3',name:'Lab',icon:'fa-solid fa-flask-vial', url: '/dashboard/lab'},
  //   {number:'5',name:'Laboratory',icon:'fa-solid fa-flask-vial', url: '/dashboard/laboratory'},
  //   {number:'6',name:'Report',icon:'fa-regular fa-file', url: '/dashboard/report'},
  
  //   {number:'7',name:'Sales',icon:'fa-solid fa-hand-holding-dollar', url: '/dashboard/sales'},
  //   {number:'8',name:'Calender',icon:'fa-regular fa-calendar', url: '/dashboard/calender'},
  //   // {number:'3',name:'Selected Tamplate',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/selected_tamplate'},
  //   {number:'9',name:'User',icon:'fa-sharp fa-solid fa-user-group', url: '/dashboard/user'},
  //   {number:'10',name:'Group',icon:'fa-sharp fa-solid fa-g', url: '/dashboard/group'},
  //   {number:'11',name:'Air-Monitoring',icon:'fas fa-calculator', url: '/dashboard/airmonitoring'},
  //   {number:'12',name:'Help & Support',icon:'fa-solid fa-handshake-angle', url: '/dashboard/support'},
  //   {number:'14',name:'Subscription',icon:'fas fa-dollar-sign', url: '/dashboard/subscription'},
  //   {number:'15',name:'Subscription Plan',icon:'fas fa-cash-register', url: '/dashboard/subscriptionPlan'},
  //   // {number:'5',name:'Home',icon:'fa-solid fa-house', url: '/tabs/courses'},
  //   // {number:'6',name:'Home',icon:'fa-solid fa-house', url: '/tabs/courses'},<i class="fas fa-cash-register"></i>
  //   // {number:'7',name:'Home',icon:'fa-solid fa-house', url: '/tabs/courses'},
  // ];

  list:any[] = [];

  decryptedData:any;
  token:any;

  // list:any[]=[
  //   {number:'1',name:'Dashboard',icon:'fa-solid fa-house', url: '/dashboard/home'},
  //   {number:'2',name:'Sub Admin',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/subAdmin'},
  //   // {number:'70',name:'Privilage',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/privilage'},
  //   {number:'7',name:'User',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/user'},
  //   {number:'3',name:'Course',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/course'},
  //   {number:'4',name:'Syllabus',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/syllabus'},
  //   {number:'5',name:'Previous Paper',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/previous_paper'},
  //   {number:'6',name:'Post',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/post'},
  //   {number:'8',name:'Online Test',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/online-test'},
  // ]; 

  // newUserList = [
  //   {number:'14',name:'Subscription',icon:'fa-solid fa-handshake-angle', url: '/dashboard/subscription'},
  // ];
  
  router = '';
  constructor(
    private route: Router,
    private profileService:ProfileService,
    private commonService:CommonService,
    private privalageService:PrivilageService,
    private sidenavService:SidenavService,
  ){
    this.router = this.route.url;
  }

 async ngOnInit() {
  this.list = await this.commonService.previlageListApiDatat();
    this.sidenavService.realSideBarAccess.subscribe(async res => {
      if(res.length || res){
        this.list = res;
      }else{
        this.list = await this.commonService.previlageListApiDatat();
        console.log(this.list)
      }

    // if(!this.list.length){
 
    //   this.list = await this.commonService.previlageListApiDatat();
    //    }
   
    
    // this.privalageService.sideBarAccess.subscribe(res=>{
    //   console.log(res);
    //   if(!res){
    //     this. privilageList();
    //   }else{
    //     this.list = this.filterList(this.list, res);
    //     this.sidenavService.udateRealSideBarData(this.list);
    //   }
     })
  }

  //  filterList(list: any[], list2: any[]) {l
  //   return list.filter(item => {
  //     const list2Item = list2.find(l2Item => l2Item.module === item.name);
  //     return list2Item ? list2Item.checked : false;
  //   });
  // }

  // privilageList(){
  //   this.privalageService.previlageLst().subscribe(res=>{
  //     console.log(res);
  //     this.privalageService.udateSideBarData(res.response[0].previleges);
  //   },err=>{
  //     console.log(err)
  //   })
  //     }

// jwtData:any;
//    async getTokenType(){
//       const jwt: any = await this.commonService.jwtToken();
//       // const data1 = jwt.admin.type; //"company"
//       console.log(jwt.admin.type);
//       this.jwtData=jwt.admin;
//   }


// dpcript(){
//   this.token = localStorage.getItem('compytkns');
//   const encruKey ="thisismyCompetitionApplication";
//   const bytes = CryptoJS.AES.decrypt(this.token, encruKey);
//   // Convert the decrypted bytes to string (utf8)
//   this.decryptedData = bytes.toString(CryptoJS.enc.Utf8);
//   console.log('Decrypted Data:', this.decryptedData);
//   const decodedToken:any = jwt_decode(this.decryptedData);
//   console.log(decodedToken);
//   this.commonService.udateAdminType(decodedToken.data);
// }
  
  routes(param:any){
    this.router = param;
   }

}
