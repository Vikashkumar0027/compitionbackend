import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HolidayModalComponent } from '../holiday-modal/holiday-modal.component';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.css'
})
export class HolidayComponent {

  private activeModal: any;
  holiList:any;

  holidayData:any[] = [
    {date: '22-2-2025', name: 'dewali', status: 'Active'},
    {date: '25-2-2025', name: 'dasahra', status: 'Active'},
    {date: '15-3-2025', name: 'holy', status: 'Active'},
    {date: '23-4-2025', name: 'eid', status: 'Active'},
  ]
  constructor(
    private modalService: NgbModal
  ) {

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

  }

}
