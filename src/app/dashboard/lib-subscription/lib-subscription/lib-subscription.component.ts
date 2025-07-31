import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../../services/global/global.service';
import { LibrarySubCriptionService } from '../../../services/librarySubscription/library-sub-cription.service';
import { LibSubModalComponent } from '../lib-sub-modal/lib-sub-modal.component';
import { ConfirmModalComponent } from '../../../common-component/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-lib-subscription',
  templateUrl: './lib-subscription.component.html',
  styleUrl: './lib-subscription.component.css'
})
export class LibSubscriptionComponent {
 classId: any; // edit object id 
  totalClasses: any[] = [];  // store all class list
  private activeModal: any;
  feeType: any;
  feeList: any[] = []

  constructor(
    private modalService: NgbModal,
    private globalService: GlobalService,
    private libSubscriptionServ:LibrarySubCriptionService

  ) {
    this.librarySubList();
  }

  ngOnInit(): void {

  }


  modalData() {
    this.activeModal = this.modalService.open(LibSubModalComponent, {
      size: "md",
      backdrop: "static",
      keyboard: false
    })
    this.activeModal.componentInstance.user = "Add";
    this.activeModal.componentInstance.classList = this.totalClasses;
    this.activeModal.result.then((result: any) => {
      if (result == "Add") {
        this.librarySubList();
      }
    },
      (reason: any) => { }
    )

  }


  // get class list 
  librarySubList() {
    this.libSubscriptionServ.librarySubList().subscribe((res) => {
      if (res.success) {
        this.feeList = res.response;
        console.log("Totals class:-", this.totalClasses);
      }
    }, (error) => {
      console.log(error, "Data is not patch ");
    })
  }




  // edit function in class component
  edit(list: any) {
    this.activeModal = this.modalService.open(LibSubModalComponent, {
      size: "md",
      backdrop: "static",
      keyboard: false,
    });
    this.activeModal.componentInstance.user = "Edit";
    this.activeModal.componentInstance.patchData = list;
    this.activeModal.componentInstance.classList = this.totalClasses
    // this.activeModal.componentInstance.subjectId = this.classId;
    this.activeModal.result.then((result: any) => {
      if (result == "Edit") {
        this.librarySubList();
      }
    },
      (reason: any) => { }
    )


  }

  // delete function in class component
  // pass the data or object id in params  
  delete(id: any) {
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
          this.deletefunction(id);
        }
      },
      (reason) => { }
    );

  }

  async deletefunction(_id: any) {

    this.libSubscriptionServ.librarySubDelete(_id).subscribe(res => {
      // console.log(res);
      if (res.success) {
        this.librarySubList();
        this.globalService.showToast(res.response);
      }
    },
      (err) => {
        this.globalService.showToastErorr('something went wrong')
        console.log(err);
      })
  }



}
