import { Component, OnInit } from '@angular/core';
import { PrivilageService } from '../../services/privilage/privilage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit {
  title = 'alfaBackend';
  sideNavStatus: boolean =false;

  constructor( private privilageService:PrivilageService) { }

  ngOnInit(): void {
    this.privilageList();
  }

  privilageList(){
    this.privilageService.previlageLst().subscribe(res=>{
      console.log(res);
      this.privilageService.udateSideBarData(res.response[0].previleges);
    },err=>{
      console.log(err)
    })
  }
}
