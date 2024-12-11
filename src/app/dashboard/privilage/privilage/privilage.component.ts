import { Component, OnInit } from '@angular/core';
import { PrivilageService } from '../../../services/privilage/privilage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivilageModalComponent } from '../privilage-modal/privilage-modal.component';

@Component({
  selector: 'app-privilage',
  templateUrl: './privilage.component.html',
  styleUrl: './privilage.component.css'
})
export class PrivilageComponent implements OnInit {
  // authService = inject(AuthService);
  // privilegeService = inject(PrivilegeService);
  // roleService = inject(RoleService);
  private activeModal:any;
  PrivilegeListData: any [] = [];
  PrivilegeMenuListData: any [] = [];
  RoleListData: any [] = [];
  heading:string = '';
  tableHeading:string = '';

  constructor(
    private modalService: NgbModal,
    private privilegeService:PrivilageService
  ){
    // console.log('Privilege Component working')
  }

  ngOnInit(): void {
      this.heading = 'Privilege';
      this.tableHeading = 'Privilege List';
      this.listOfPrivilege();
      // this.listOfPrivilegeMenu();
  }

  listOfRoles(){
    // localStorage.getItem('ADToken');
    // this.roleService.RoleList().subscribe(res => {
    //   if(res.success){
    //     console.log(res.response);
    //     this.RoleListData = res.response;
        
    //   }else{
    //     console.log('No data found!',res.message);
    //   }
    //   // this.globalService.showToast('successfully logged in');
    // }, error => {
    //   console.log(error);
    // });
  }
  listOfPrivilege(){
    // this.privilegeService.PrivilegeList().subscribe(res => {
    //   console.log(res);
    //   if(res.success){
    //     this.PrivilegeListData = res.response;
        
    //   }else{
    //     console.log('No data found!',res.message);
    //   }
    //   // this.globalService.showToast('successfully logged in');
    // }, error => {
    //   console.log(error);
    // });
  }
  listOfPrivilegeMenu(){
    // this.privilegeService.PrivilegeMenuList().subscribe(res => {
    //   console.log(res);
    //   if(res.success){
    //     this.PrivilegeMenuListData = res.response;
        
    //   }else{
    //     console.log('No data found!',res.message);
    //   }
    //   // this.globalService.showToast('successfully logged in');
    // }, error => {
    //   console.log(error);
    // });
  }
  modalData(){ 
    this.activeModal = this.modalService.open(PrivilageModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    this.activeModal.componentInstance.user = 'Add';
    this.activeModal.componentInstance.modalTitle = 'Add Privilege';
        this.activeModal.componentInstance.PrivilegeMenuListData = '';
        this.activeModal.componentInstance.RoleListData = 'RoleListData.response';

    //data transfer to child NgbModalRef
    this.activeModal.result.then(
      (result:any) => {
        if (result == 'Add') {
          // this.getList();
        }
      },
      (reason:any) => {}
    );



  //   forkJoin({
  //     PrivilegeMenuListData: this.privilegeService.PrivilegeMenuList(),
  //     RoleListData: this.roleService.RoleList()
  //   }).subscribe(
  //     ({ PrivilegeMenuListData, RoleListData }) => {
  //       // console.log(PrivilegeMenuListData.response);
  //     this.activeModal = this.modalService.open(PrivilegemodelComponent, {
  //       size: 'lg',
  //       backdrop: 'static',
  //       keyboard: false,
  //     });
  //     this.activeModal.componentInstance.userType = 'Add';
  //     this.activeModal.componentInstance.modalTitle = 'Add Privilege';
  //     this.activeModal.componentInstance.PrivilegeMenuListData = PrivilegeMenuListData.response;
  //     this.activeModal.componentInstance.RoleListData = RoleListData.response;
  //     //data transfer to child NgbModalRef
  //     this.activeModal.result.then(
  //       (result:any) => {
  //         if (result == 'Add') {
  //           this.listOfPrivilege();  // Update Fuction Call Here After Add Role
  //         }
  //       },
  //       (reason:any) => {}
  //     );
  //   },
  //   error => {
  //     console.error('Error fetching data:', error);
  //   }
  // );
  }

  async editPrivilege(data:any){
  //   forkJoin({
  //     PrivilegeMenuListData: this.privilegeService.PrivilegeMenuList(),
  //     RoleListData: this.roleService.RoleList()
  //   }).subscribe(
  //     ({ PrivilegeMenuListData, RoleListData }) => {
  //   this.activeModal = this.modalService.open(PrivilegemodelComponent, {
  //     size: 'lg',
  //     backdrop:'static',
  //     keyboard: false,
  //   });
  //   this.activeModal.componentInstance.userType = 'Edit';
  //   this.activeModal.componentInstance.modalTitle = 'Edit Privilege';
  //   this.activeModal.componentInstance.PrivilegeMenuListData = PrivilegeMenuListData.response;
  //   this.activeModal.componentInstance.RoleListData = RoleListData.response;
  //   this.activeModal.componentInstance.PatchData = data;

  //   //data transfer to child NgbModalRef
  //   this.activeModal.result.then(
  //     (result:any) => {
  //       if (result == 'Edit') {
  //         this.listOfPrivilege();  
          
  //       }
  //     },
  //     (reason:any) => {}
  //   ); 
  // },
  //   error => {
  //     console.error('Error fetching data:', error);
  //   }
  // );
  }

  async deletePrivilege(data:any){
    let privilegeId = data._id;
   let x =  confirm('Are you sure you want to delete');
    if(x == true){
      this.delete(privilegeId);
    }else{
      console.log('into the else');
      
    }
   
  }

  delete(privilegeId:any){
  //   this.privilegeService.PrivilegeDelete(privilegeId).subscribe(res => {
  //     console.log(res);
  //     if(res.success){
  //       // this.RoleListData = res.response;
  //       this.listOfPrivilege();  
  //     }else{
  //       console.log('Error',res.message);
  //     }
  //   }, error => {
  //     console.log(error);
  //   });
  }
}
