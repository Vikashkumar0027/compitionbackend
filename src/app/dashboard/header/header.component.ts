import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common/common.service';
import { ProfileService } from '../../services/profile/profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../common-component/confirm-modal/confirm-modal.component';
import { ChangePassComponent } from '../../common-component/change-pass/change-pass.component';
import { ProfileComponent } from '../../common-component/profile/profile.component';
import { PrivilageService } from '../../services/privilage/privilage.service';
// import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggled = new EventEmitter<boolean>();
  menuStatus:boolean=false;
  userName: any;
  data:any={};
  profileDetail:any;
  private activeModal:any;

  constructor(
    private commonService:CommonService,
    private route:Router,
    private profileService:ProfileService,
     private modalService: NgbModal,
      private privilageService:PrivilageService,
      // private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    
    this.getDecodedToken();
    this.showData();
    this.getDetail();
  }

  getDetail(){
    // this.spinner.show();
    this.privilageService.previlageLst().subscribe(res=>{
      console.log(res);
      // this.spinner.hide();
      if(res.success && res?.response?.length){
        this.profileDetail = res.response[0];
      }
    },err=>{
      // this.spinner.hide();
      console.log(err);
      this.commonService.tokenOutOfValid(err);
    })
  }

  SideNavToggle(){
    this.menuStatus = !this.menuStatus;
    this.sidenavToggled.emit(this.menuStatus);
  }

  async getDecodedToken(){
    const tokens:any = await this.commonService.jwtToken();
    this.userName = tokens.admin.name;
  }

  profileModal(){
    this.activeModal = this.modalService.open(ProfileComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    // this.activeModal.componentInstance.user = 'Add';

  }

  changePassModal(){
       this.activeModal = this.modalService.open(ChangePassComponent, {
            size: 'sm',
            backdrop: 'static',
            keyboard: false,
          });
          this.activeModal.componentInstance.user = 'Add';
      
          //data transfer to child NgbModalRef
          this.activeModal.result.then(
            (result:any) => {
              if (result == 'Add') {
                // this.getList();
              }
            },
            (reason:any) => {}
          );
  }
  
  logOut(){

     const activeModal = this.modalService.open(ConfirmModalComponent, {
            size: '',
            backdrop: 'static',
            keyboard: false,
          });
          //data transfer to child
          const contentObj = {
            heading: 'Logout!',
            message: 'Are you sure want to logout ?',
            cancel: 'Cancel',
            ok: 'Ok'
          }
          activeModal.componentInstance.modalContent = contentObj;
          activeModal.componentInstance.resetpassword = false;
          activeModal.result.then(
            (result) => {
            
      
              if (result === 'Ok') {
                // this.deletefunction(param._id);  
                localStorage.removeItem('compytkns');
                this.route.navigate(['']);   
              }
            },
            (reason) => {}
          );


  }

  async showData(){
    
    const jwt:any = await this.commonService.jwtToken();
          const data1 = jwt.admin.id;
  
  
    // this.profileService.showProfile(data1).subscribe(res => {
   
    //  if(res.success == true){
    //   // this.data = res.data
    //   this.profileService.getUpdateprofile(res.data);
    //  }
  
    // },
    // (err)=>{

    //   console.log('Error in Profile Api ShowList',err);
    // }
    // )
   }
   onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/sucessKey-logo.jpg';
  }
}
