import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../services/common/common.service';
import { GlobalService } from '../../../services/global/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChapterService } from '../../../services/chapter/chapter.service';
import { AddchapterComponent } from '../addchapter/addchapter.component';
import { ConfirmModalComponent } from '../../../common-component/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.css'
})
export class ChapterComponent implements OnInit{
  subjectId:any;
  data:any[]=[];
  searchCompany:any;
  private activeModal:any;
  
  // @ViewChild(LoginComponent) loginModaComponent: LoginComponent | undefined;
    constructor(
      private route:Router,
      private modalService: NgbModal,
      // private userService:UserService,
      private commonService:CommonService,
      private global:GlobalService,
      // private courseService:CourseService,
      private chapterService:ChapterService,
      private spinner: NgxSpinnerService,
      private activatedRoute: ActivatedRoute
      )
    {}
    moduleId:any;
    ngOnInit(): void {
      const data: any = this.activatedRoute.snapshot.queryParams;
      this.moduleId = JSON.parse(data.data);
      this.subjectId = this.moduleId.subjectId;
      // this.subjectId = this.activatedRoute.snapshot.paramMap.get('id');
      console.log(this.subjectId);
      this.getList();
    }
  
  
    getList(){
    try {
      this.spinner.show();
      this.chapterService.chapterList(this.subjectId).subscribe(res=>{
      console.log(res);
      if(res.success){
        this.data=res.response;
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
      this.activeModal = this.modalService.open(AddchapterComponent, {
        size: 'lg',
        backdrop: 'static',
        keyboard: false,
      });
      this.activeModal.componentInstance.user = 'Add';
      this.activeModal.componentInstance.subjectId = this.subjectId;
  
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
      this.activeModal = this.modalService.open(AddchapterComponent, {
        size: 'lg',
        backdrop: 'static',
        keyboard: false,
      });
      this.activeModal.componentInstance.user = 'Edit';
      this.activeModal.componentInstance.patchData = data;
      this.activeModal.componentInstance.subjectId = this.subjectId;
  
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
      this.chapterService.chapterDelete(id).subscribe(res => {
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

    topics(list:any){
      // dashboard/subject/chapter
      // this.route.navigate(['/','dashboard','subject','chapter',list._id]);
      console.log(list)
      const data ={chapterId:list._id, subjetId:list.subjectId,courseId:this.moduleId.courseId};
      const navData:NavigationExtras = {
        queryParams:{
          data:JSON.stringify(data)
        }
      }
      
      this.route.navigate(['/','dashboard','chapter','topic'],navData);
    }

    goSubject(){
      // dashboard/subject/chapter
      this.route.navigate(['/','dashboard','course','subject',this.moduleId.courseId]);
    }


}
