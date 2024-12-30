import { Component, OnInit } from '@angular/core';
import { PrivilageService } from '../../services/privilage/privilage.service';
import { SubAdminService } from '../../services/subAdmin/sub-admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  sliderAccess:any[] =[];
  dashboardData:any;
  constructor(
    private privilageService:PrivilageService,
    private subAdminService:SubAdminService
  ) {
    
   }

  ngOnInit(): void {
    this.getDashboard();
    // this.privilageService.sideBarAccess.subscribe(res=>{
    //   console.log(res);
    //  if(!res){
    //     this.privilageList();
    //   }
    //  })
   
  }

//   privilageList(){
// this.privilageService.previlageLst().subscribe(res=>{
//   console.log(res);
//   this.privilageService.udateSideBarData(res.response[0].previleges);
// },err=>{
//   console.log(err)
// })
//   }

getDashboard(){
  this.subAdminService.dashboard().subscribe(res=>{
    console.log(res);
    if(res.success){
      this.dashboardData = res.response;
    }
  },err=>{
    console.log(err);
  })
}

}
