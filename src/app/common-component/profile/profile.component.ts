import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivilageService } from '../../services/privilage/privilage.service';
import { CommonService } from '../../services/common/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profileDetail:any;
  constructor(private activeModal: NgbActiveModal,
    private privilageService:PrivilageService,
    private commonService:CommonService,
    private spinner: NgxSpinnerService
  ){
  }

  modalClose() {
    this.activeModal.close();
  }

  ngOnInit(): void {
      this.getDetail();
  }
  getDetail(){
    this.spinner.show();
    this.privilageService.previlageLst().subscribe(res=>{
      console.log(res);
      this.spinner.hide();
      if(res.success && res?.response?.length){
        this.profileDetail = res.response[0];
      }
    },err=>{
      this.spinner.hide();
      console.log(err);
      this.commonService.tokenOutOfValid(err);
    })
  }
}
