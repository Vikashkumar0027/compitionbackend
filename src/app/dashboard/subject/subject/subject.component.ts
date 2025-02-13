import { Component, OnInit } from '@angular/core';
import { ConfirmModalComponent } from '../../../common-component/confirm-modal/confirm-modal.component';
import { AddsubjectComponent } from '../addsubject/addsubject.component';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../services/common/common.service';
import { GlobalService } from '../../../services/global/global.service';
import { CourseService } from '../../../services/course/course.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubjectService } from '../../../services/subject/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent implements OnInit {

  courseId:any;
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
      private subjectService:SubjectService,
      private spinner: NgxSpinnerService,
      private activatedRoute: ActivatedRoute
      )
    {}
  
    ngOnInit(): void {
      this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
      console.log(this.courseId);
      this.getList();
    }
  
  
    getList(){
    try {
      this.spinner.show();
      this.subjectService.subjectList(this.courseId).subscribe(res=>{
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
      this.activeModal = this.modalService.open(AddsubjectComponent, {
        size: 'lg',
        backdrop: 'static',
        keyboard: false,
      });
      this.activeModal.componentInstance.user = 'Add';
      this.activeModal.componentInstance.courseId = this.courseId;
  
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
      this.activeModal = this.modalService.open(AddsubjectComponent, {
        size: 'lg',
        backdrop: 'static',
        keyboard: false,
      });
      this.activeModal.componentInstance.user = 'Edit';
      this.activeModal.componentInstance.patchData = data;
      this.activeModal.componentInstance.courseId = this.courseId;
  
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
      this.subjectService.subjectDelete(id).subscribe(res => {
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

    chapter(list:any){
      
         const data ={subjectId:list._id, courseId:this.courseId};
            const navData:NavigationExtras = {
              queryParams:{
                data:JSON.stringify(data)
              }
            }
            
        //     this.route.navigate(['/','dashboard','chapter','topic'],navData);
      // dashboard/subject/chapter
      this.route.navigate(['/','dashboard','subject','chapter'],navData);
      // this.route.navigate(['/','dashboard','subject','chapter',list._id]);
    }

    goBackCouse(){
      this.route.navigate(['/','dashboard','course']);
    }

}
