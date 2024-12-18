import { Component, OnInit } from '@angular/core';
import { PrivilageService } from '../../services/privilage/privilage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  sliderAccess:any[] =[];
  constructor(
    private privilageService:PrivilageService
  ) {
    
   }

  ngOnInit(): void {
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


}
