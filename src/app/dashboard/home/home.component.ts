import { Component, OnInit } from '@angular/core';
import { PrivilageService } from '../../services/privilage/privilage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(
    private privilageService:PrivilageService
  ) { }

  ngOnInit(): void {
    this.privilageList();
  }

  privilageList(){
this.privilageService.previlageLst().subscribe(res=>{
  console.log(res);
},err=>{
  console.log(err)
})
  }
}
