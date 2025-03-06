import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HolidayModalComponent } from '../holiday-modal/holiday-modal.component';
import { HolidayService } from '../../../services/holiday/holiday.service';
import { GlobalService } from '../../../services/global/global.service';
import { ConfirmModalComponent } from '../../../common-component/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.css'
})
export class HolidayComponent {

  private activeModal: any;
  holiList: any;

  holidayData: any[] = []
  constructor(
    private modalService: NgbModal,
    private holidayService: HolidayService,
    private globalService: GlobalService
  ) {
    this.getHoliday()
  }

  holidayModal() {
    this.activeModal = this.modalService.open(HolidayModalComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false
    })
    this.activeModal.componentInstance.user = 'Add',
      this.activeModal.componentInstance.holiList = this.holidayData,
      this.activeModal.result.then((res: any) => {
        if (res == 'Add') {
          this.getHoliday();
        }
      },
        (reason: any) => { }
      )
  }


  getHoliday() {
    this.holidayService.holidayList().subscribe(res => {
      console.log("HolidayList:-", res.response);
      this.holidayData = res.response;
    }, err => {
      console.log(err);
    })
  }

  editHoliday(list: any) {
    this.activeModal = this.modalService.open(HolidayModalComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false
    })
    this.activeModal.componentInstance.user = "Edit",
      this.activeModal.componentInstance.patchData = list,
      this.activeModal.result.then((res: any) => {
        if (res == "Edit") {
          this.getHoliday();
        }
      },
        (reason: any) => { }
      )
  }

  deleteHoliday(id: any) {
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

    this.holidayService.holidayDelete(_id).subscribe(res => {
      // console.log(res);
      if (res.success) {
        this.getHoliday()
        this.globalService.showToast(res.response);
      }
    },
      (err) => {
        this.globalService.showToastErorr('Something went wrong')
        console.log(err);
      })
  }


}
