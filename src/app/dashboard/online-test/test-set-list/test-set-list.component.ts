import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../services/common/common.service';
import { GlobalService } from '../../../services/global/global.service';
import { OnlineTestService } from '../../../services/onlineTest/online-test.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalBatchComponent } from '../modal-batch/modal-batch.component';
import { ConfirmModalComponent } from '../../../common-component/confirm-modal/confirm-modal.component';
import { ModalSetlistComponent } from '../modal-setlist/modal-setlist.component';

@Component({
  selector: 'app-test-set-list',
  templateUrl: './test-set-list.component.html',
  styleUrl: './test-set-list.component.css'
})
export class TestSetListComponent {
  data:any[]=[];
  searchCompany:any;
  private activeModal:any;
  courseid:any;
  
  // @ViewChild(LoginComponent) loginModaComponent: LoginComponent | undefined;
    constructor(
      private route:Router,
      private modalService: NgbModal,
      private commonService:CommonService,
      private global:GlobalService,
      private onlineService:OnlineTestService,
      private spinner: NgxSpinnerService,
      private activatedRoute: ActivatedRoute
      )
    {}
  
    ngOnInit(): void {
      this.courseid = this.activatedRoute.snapshot.paramMap.get('id');
      this.getList();
    }
  
  
    getList(){
    try {
      this.spinner.show();
      this.onlineService.setTestList(this.courseid).subscribe(res=>{
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
      this.activeModal = this.modalService.open(ModalSetlistComponent, {
        size: 'lg',
        backdrop: 'static',
        keyboard: false,
      });
      this.activeModal.componentInstance.user = 'Add';
      this.activeModal.componentInstance.subjectId = this.courseid;
  
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
      this.activeModal = this.modalService.open(ModalSetlistComponent, {
        size: 'lg',
        backdrop: 'static',
        keyboard: false,
      });
      this.activeModal.componentInstance.user = 'Edit';
      this.activeModal.componentInstance.patchData = data;
      this.activeModal.componentInstance.subjectId = this.courseid;
  
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
      this.onlineService.setTestDelete(id).subscribe(res => {
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

    setList(list:any){

      const data ={subjectId:this.courseid, setId:list._id};
      const navData:NavigationExtras = {
        queryParams:{
          data:JSON.stringify(data)
        }
      }
      // dashboard/course/subject/454
      // alert('nothing else')
      this.route.navigate(['/','dashboard','online-test','qestion'],navData);
    }
}
