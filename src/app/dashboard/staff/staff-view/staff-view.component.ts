import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-staff-view',
  templateUrl: './staff-view.component.html',
  styleUrl: './staff-view.component.css'
})
export class StaffViewComponent implements OnInit {
  @Input() public user: any;
  @Input() public patchData: any;
  Staff: any;

  constructor(private activeModal: NgbActiveModal) {

  }

  modalClose() {
    this.activeModal.close();
  }

  ngOnInit(): void {
    this.patchDataFunction()
  }

  patchDataFunction() {
    if (this.user == 'view') {
      if (this.patchData) {
        this.Staff = this.patchData

      }
    }
  }
}
