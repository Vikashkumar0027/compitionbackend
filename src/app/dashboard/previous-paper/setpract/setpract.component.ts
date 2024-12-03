import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../services/common/common.service';
import { GlobalService } from '../../../services/global/global.service';
import { PrevoiusPaperService } from '../../../services/previousPaper/prevoius-paper.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalSetComponent } from '../modal-set/modal-set.component';
import { ConfirmModalComponent } from '../../../common-component/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-setpract',
  templateUrl: './setpract.component.html',
  styleUrl: './setpract.component.css'
})
export class SetpractComponent implements OnInit {
 previouspaperId:any;
  data:any[]=[];
  searchCompany:any;
  private activeModal:any;
  
  // @ViewChild(LoginComponent) loginModaComponent: LoginComponent | undefined;
    constructor(
      private route:Router,
      private modalService: NgbModal,
      private commonService:CommonService,
      private global:GlobalService,
      private previousPaperService:PrevoiusPaperService,
      private spinner: NgxSpinnerService,
      private activatedRoute: ActivatedRoute
      )
    {}
  
    ngOnInit(): void {
      this.previouspaperId = this.activatedRoute.snapshot.paramMap.get('id');
      this.getList();
    }
  
  
    getList(){
    try {
      this.spinner.show();
      this.previousPaperService.previousView(this.previouspaperId).subscribe(res=>{
      console.log(res);
      if(res.success){
        this.data=res.response.previousExam;
      }
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.commonService.tokenOutOfValid(err)
    })
    } catch (error) {
      this.spinner.hide();
    }
    }
  
    modalData(){
      this.activeModal = this.modalService.open(ModalSetComponent, {
        size: 'lg',
        backdrop: 'static',
        keyboard: false,
      });
      this.activeModal.componentInstance.user = 'Add';
      this.activeModal.componentInstance.previousPpeperId = this.previouspaperId;
  
      //data transfer to child NgbModalRef
      this.activeModal.result.then(
        (result:any) => {
          if (result == 'Add') {
            this.getList();
          }
        },
        (reason:any) => {}
      );
    }
  
    edit(data:any){
      // console.log(data)
      this.activeModal = this.modalService.open(ModalSetComponent, {
        size: 'lg',
        backdrop: 'static',
        keyboard: false,
      });
      this.activeModal.componentInstance.user = 'Edit';
      this.activeModal.componentInstance.patchData = data; 
      this.activeModal.componentInstance.previousPpeperId = this.previouspaperId;
  
      //data transfer to child NgbModalRef
      this.activeModal.result.then(
        (result:any) => {
          if (result == 'Edit') {
            this.getList();
          }
        },
        (reason:any) => {}
      );
    }
  
    deletes(param:any){
      
      const activeModal = this.modalService.open(ConfirmModalComponent, {
        size: '',
        backdrop: 'static',
        keyboard: false,
      });
      //data transfer to child
      const contentObj = {
        heading: 'Delete!',
        message: 'Are you sure want to Delete ?',
        cancel: 'Cancel',
        ok: 'Delete'
      }
      activeModal.componentInstance.modalContent = contentObj;
      activeModal.componentInstance.resetpassword = false;
      activeModal.result.then(
        (result) => {
        
  
          if (result === 'Ok') {
            this.deletefunction(param.id);     
          }
        },
        (reason) => {}
      );
    }
  
  
   
  
    showPassWord(msg:any){
      const activeModal = this.modalService.open(ConfirmModalComponent, {
        size: '',
        backdrop: 'static',
        keyboard: false,
      });
      //data transfer to child
      const contentObj = {
        heading: 'Updated Password',
        message:  msg,
        // cancel: 'Cancel',
        // ok: 'Yes'
      }
      const rstpsd = true;
      activeModal.componentInstance.modalContent = contentObj;
      activeModal.componentInstance.resetpassword = rstpsd;
    }
  
    async deletefunction(id:any){
      // alert(id)
      this.previousPaperService.previousPdfDelete(this.previouspaperId,id).subscribe(res => {
        // console.log(res);
        if(res.success){
          this.getList();
          this.global.showToast('Deleted');
        }
       },
       (err)=> {
        this.global.showToastErorr('somthing went wrong')
       })
  
    }

}
