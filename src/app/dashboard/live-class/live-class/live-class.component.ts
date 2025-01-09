import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../services/common/common.service';
import { GlobalService } from '../../../services/global/global.service';
import { LiveclassService } from '../../../services/liveclass/liveclass.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LiveclassModalComponent } from '../liveclass-modal/liveclass-modal.component';
import { ConfirmModalComponent } from '../../../common-component/confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-live-class',
  templateUrl: './live-class.component.html',
  styleUrl: './live-class.component.css'
})
export class LiveClassComponent implements OnInit {
 
  data:any[]=[];
    searchCompany:any;
    private activeModal:any;
    
    // @ViewChild(LoginComponent) loginModaComponent: LoginComponent | undefined;
      constructor(
        private route:Router,
        private modalService: NgbModal,
        private commonService:CommonService,
        private global:GlobalService,
        private liveClassService:LiveclassService,
        private spinner: NgxSpinnerService,
        private activatedRoute: ActivatedRoute
        )
      {}
    
      ngOnInit(): void {
        this.getList();
      }
    
    
      getList(){
      try {
        this.spinner.show();
        this.liveClassService.getList().subscribe(res=>{
        console.log(res);
        if(res.success){
          this.data=res.response;
        }
        this.spinner.hide();
      },err=>{
        this.spinner.hide();
        this.commonService.tokenOutOfValid(err);
      })
      } catch (error) {
        this.spinner.hide();
      }
      }
    
      modalData(){
        this.activeModal = this.modalService.open(LiveclassModalComponent, {
          size: 'lg',
          backdrop: 'static',
          keyboard: false,
        });
        this.activeModal.componentInstance.user = 'Add';
    
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
        this.activeModal = this.modalService.open(LiveclassModalComponent, {
          size: 'lg',
          backdrop: 'static',
          keyboard: false,
        });
        this.activeModal.componentInstance.user = 'Edit';
        this.activeModal.componentInstance.patchData = data;
    
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
              this.deletefunction(param._id);     
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
        this.liveClassService.liveClassDelete(id).subscribe(res => {
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
