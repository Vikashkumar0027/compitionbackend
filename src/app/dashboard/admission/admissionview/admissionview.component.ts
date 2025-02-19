import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admissionview',
  templateUrl: './admissionview.component.html',
  styleUrl: './admissionview.component.css'
})
export class AdmissionviewComponent implements OnInit {

  @Input() public user: any;
  @Input() public patchData: any;
  viewData: any;

  constructor(private activeModal: NgbActiveModal) {
    console.log(this.user);
    console.log(this.patchData, "patch data");


  }

  ngOnInit(): void {
    this.patchDataFunction()
  }

  patchDataFunction() {
    if (this.user == 'view') {
      if (this.patchData) {
        this.viewData = this.patchData

      }
    }
  }


  modalClose() {
    this.activeModal.close();
  }
}

