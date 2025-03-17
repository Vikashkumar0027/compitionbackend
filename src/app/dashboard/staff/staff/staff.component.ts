import { Component } from '@angular/core';
import { STAFF_DATA } from '../stafflist';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffModalComponent } from '../staff-modal/staff-modal.component';
import { ConfirmModalComponent } from '../../../common-component/confirm-modal/confirm-modal.component';
import { StaffViewComponent } from '../staff-view/staff-view.component';
import { StaffService } from '../../../services/staff/staff.service';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent {
  StaffList: any = STAFF_DATA
  searchData: any;
  totalStaff: any[] = [];
  TotalsStaffList: any[] = [];
  private activeModal: any;

  constructor(
    private modalService: NgbModal,
    private staffService: StaffService
  ) {
    console.log(this.totalStaff, "total staff");
    this.staffList();
  }

  // staff list
  staffList() {
    this.staffService.staffList().subscribe(res => {
      if (res.success) {
        this.totalStaff = res.response;
      }
      console.log(res, "admission data")
    }, err => {
      console.log(err)
    })
  }

  modalData() {
    this.activeModal = this.modalService.open(StaffModalComponent, {
      size: "lg",
      backdrop: "static",
      keyboard: false
    })
    this.activeModal.componentInstance.user = "Add";
    this.activeModal.componentInstance.totalClasses = this.TotalsStaffList;
    this.activeModal.result.then((result: any) => {
      if (result == "Add") {
        this.staffList();
      }
    },
      (reason: any) => { }
    )

  }

  searchStaff(searchData: any) {

  }




  deletes(param: any) {

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
          // this.deletefunction(param._id);
          // this.studentList(this.formData)
        }
      },
      (reason) => { }
    );

  }

  edit(list: any, admissionId: any) {
    this.activeModal = this.modalService.open(StaffModalComponent, {
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
    this.activeModal.componentInstance.user = "Edit";
    this.activeModal.componentInstance.patchData = list;
    this.activeModal.componentInstance.admissionId = admissionId;
    this.activeModal.result.then((result: any) => {
      if (result == "Edit") {
        // this.studentList(this.formData)
      }
    },
      (reason: any) => { }
    )


  }

  viewData(staffView: any) {
    this.activeModal = this.modalService.open(StaffViewComponent, {
      size: "lg",
      backdrop: "static",
      keyboard: false
    })
    this.activeModal.componentInstance.user = "view";
    this.activeModal.componentInstance.patchData = staffView;
    // this.activeModal.componentInstance.subjectId = this.viewDataId;
    this.activeModal.result.then((result: any) => {
      if (result == "view") {
        this.getStaff();

      }
    },
      (reason: any) => { }
    )

  }

  getStaff() {
    this.staffService.staffList().subscribe(res => {
      console.log("StaffList:-", res.response);
      this.totalStaff = res.response;
    }, err => {
      console.log(err);
    })
  }

}
