import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {

  data:any={};
  @Input() sideNavStatus: boolean=true;

  subscribeList:any[]=[
    {number:'1',name:'Dashboard',icon:'fa-solid fa-house', url: '/dashboard/home'},
    {number:'2',name:'Project',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/job'},
    {number:'3',name:'Client',icon:'fa-sharp fa-solid fa-user', url: '/dashboard/client'},
    {number:'15',name:'Template',icon:'fa-regular fa-file', url: '/dashboard/template'},
    {number:'4',name:'Site',icon:'fa-solid fa-location-dot', url: '/dashboard/site'},
    // {number:'3',name:'Lab',icon:'fa-solid fa-flask-vial', url: '/dashboard/lab'},
    {number:'5',name:'Laboratory',icon:'fa-solid fa-flask-vial', url: '/dashboard/laboratory'},
    {number:'6',name:'Report',icon:'fa-regular fa-file', url: '/dashboard/report'},
  
    {number:'7',name:'Sales',icon:'fa-solid fa-hand-holding-dollar', url: '/dashboard/sales'},
    {number:'8',name:'Calender',icon:'fa-regular fa-calendar', url: '/dashboard/calender'},
    // {number:'3',name:'Selected Tamplate',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/selected_tamplate'},
    {number:'9',name:'User',icon:'fa-sharp fa-solid fa-user-group', url: '/dashboard/user'},
    {number:'10',name:'Group',icon:'fa-sharp fa-solid fa-g', url: '/dashboard/group'},
    {number:'11',name:'Air-Monitoring',icon:'fas fa-calculator', url: '/dashboard/airmonitoring'},
    {number:'12',name:'Help & Support',icon:'fa-solid fa-handshake-angle', url: '/dashboard/support'},

    {number:'13',name:'Subscription',icon:'fas fa-dollar-sign', url: '/dashboard/subscription'},

    
  ];
  adminList:any[]=[
    {number:'1',name:'Dashboard',icon:'fa-solid fa-house', url: '/dashboard/home'},
    {number:'2',name:'Project',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/job'},
    {number:'3',name:'Client',icon:'fa-sharp fa-solid fa-user', url: '/dashboard/client'},
    {number:'15',name:'Template',icon:'fa-regular fa-file', url: '/dashboard/template'},
    {number:'13',name:'Company',icon:'fas fa-building', url: '/dashboard/company'},
    {number:'4',name:'Site',icon:'fa-solid fa-location-dot', url: '/dashboard/site'},
    // {number:'3',name:'Lab',icon:'fa-solid fa-flask-vial', url: '/dashboard/lab'},
    {number:'5',name:'Laboratory',icon:'fa-solid fa-flask-vial', url: '/dashboard/laboratory'},
    {number:'6',name:'Report',icon:'fa-regular fa-file', url: '/dashboard/report'},
  
    {number:'7',name:'Sales',icon:'fa-solid fa-hand-holding-dollar', url: '/dashboard/sales'},
    {number:'8',name:'Calender',icon:'fa-regular fa-calendar', url: '/dashboard/calender'},
    // {number:'3',name:'Selected Tamplate',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/selected_tamplate'},
    {number:'9',name:'User',icon:'fa-sharp fa-solid fa-user-group', url: '/dashboard/user'},
    {number:'10',name:'Group',icon:'fa-sharp fa-solid fa-g', url: '/dashboard/group'},
    {number:'11',name:'Air-Monitoring',icon:'fas fa-calculator', url: '/dashboard/airmonitoring'},
    {number:'12',name:'Help & Support',icon:'fa-solid fa-handshake-angle', url: '/dashboard/support'},
    {number:'14',name:'Subscription',icon:'fas fa-dollar-sign', url: '/dashboard/subscription'},
    {number:'15',name:'Subscription Plan',icon:'fas fa-cash-register', url: '/dashboard/subscriptionPlan'},
    // {number:'5',name:'Home',icon:'fa-solid fa-house', url: '/tabs/courses'},
    // {number:'6',name:'Home',icon:'fa-solid fa-house', url: '/tabs/courses'},<i class="fas fa-cash-register"></i>
    // {number:'7',name:'Home',icon:'fa-solid fa-house', url: '/tabs/courses'},
  ];

  list:any[]=[
    {number:'1',name:'Dashboard',icon:'fa-solid fa-house', url: '/dashboard/home'},
    {number:'2',name:'Customer',icon:'fa-sharp fa-solid fa-clipboard-list', url: '/dashboard/job'},
  ]; 

  newUserList = [
    {number:'14',name:'Subscription',icon:'fa-solid fa-handshake-angle', url: '/dashboard/subscription'},
  ];
  
  router = '';
  constructor(
    private route: Router,
    private profileService:ProfileService,
    private commonService:CommonService
  ){
    this.router = this.route.url
  }

  ngOnInit(): void {
    this.getTokenType();
    // this.profileService.profile.subscribe(res=>{
    //   this.data=res;
    //   if(!this.data.subscription){
    //     (this.jwtData.type == "admin" ) ? this.list = [...this.adminList] : this.list = [...this.newUserList];
    //   }else{
    //     if(this.jwtData.type == 'company'){
    //       this.list = [...this.subscribeList];
    //     }else{
    //       this.list = [...this.adminList];
    //     }
    //   }
    // })
  }
jwtData:any;
   async getTokenType(){
      const jwt: any = await this.commonService.jwtToken();
      // const data1 = jwt.admin.type; //"company"
      console.log(jwt.admin.type);
      this.jwtData=jwt.admin;
  }
  
  routes(param:any){
    this.router = param;
   }

}
