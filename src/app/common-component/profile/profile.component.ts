import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivilageService } from '../../services/privilage/privilage.service';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profileDetail:any;
  constructor(private activeModal: NgbActiveModal,
    private privilageService:PrivilageService,
    private commonService:CommonService
  ){
  }

  modalClose() {
    this.activeModal.close();
  }

  ngOnInit(): void {
      this.getDetail();
  }
  getDetail(){
    this.privilageService.previlageLst().subscribe(res=>{
      console.log(res);
      if(res.success){
        this.profileDetail = res.response;
      }
    },err=>{
      console.log(err);
      this.commonService.tokenOutOfValid(err);
    })
  }
}
