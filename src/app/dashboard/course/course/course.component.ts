import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../services/common/common.service';
import { GlobalService } from '../../../services/global/global.service';
import { CourseService } from '../../../services/course/course.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmModalComponent } from '../../../common-component/confirm-modal/confirm-modal.component';
import { CourseModalComponent } from '../course-modal/course-modal.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {

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
      private courseService:CourseService,
      private spinner: NgxSpinnerService,
      )
    {}
  
    ngOnInit(): void {
      this.getList();
    }
  
  
    getList(){
    try {
      this.spinner.show();
      this.courseService.courseList().subscribe(res=>{
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
      this.activeModal = this.modalService.open(CourseModalComponent, {
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
      this.activeModal = this.modalService.open(CourseModalComponent, {
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
    viewDetail(data:any){
      // console.log(data)
      this.activeModal = this.modalService.open(CourseModalComponent, {
        size: 'lg',
        backdrop: 'static',
        keyboard: false,
      });
      this.activeModal.componentInstance.user = 'View';
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
  
  
    // resetPassAert(param:any){
     
    //   const activeModal = this.modalService.open(ConfirmModalComponent, {
    //     size: '',
    //     backdrop: 'static',
    //     keyboard: false,
    //   });
      
    //   const contentObj = {
    //     heading: 'Reset Password!',
    //     message: 'Are you sure want to change password ?',
    //     cancel: 'Cancel',
    //     ok: 'Yes',
    //   }
  
    //   activeModal.componentInstance.modalContent = contentObj;
      
    //   activeModal.componentInstance.resetpassword = false;
    //   activeModal.result.then(
    //     (result) => {
       
  
    //       if (result === 'Ok') {
           
    //        this.resetPassword(param);   
    //       }
    //     },
    //     (reason) => {}
    //   );
    // }
  
    // resetPassword(data:any){
    //   const formData = { "email": data.email};
    //   console.log(formData);
    //   this.spinner.show();
    //   this.subAdminService.resetPassword(formData).subscribe(res=> {
    //     // console.log(res.msg);
    //     if(res.success){
    //       this.spinner.hide();
    //       this.showPassWord(res.msg);
    //     }
    //   },
    //   (err)=> {
    //     this.spinner.hide();
    //    this.global.showToastErorr('somthing went wrong')
    //   })
    // }
  
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
      this.courseService.courseDelete(id).subscribe(res => {
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

    subject(list:any){
      // dashboard/course/subject/454
      this.route.navigate(['/','dashboard','course','subject',list._id]);
    }
    onImageError(event: Event): void {
      const imgElement = event.target as HTMLImageElement;
      imgElement.src = 'assets/images/sucessKey-logo.jpg';
    }
}
