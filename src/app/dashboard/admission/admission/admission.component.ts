import { Component } from '@angular/core';
import { ConfirmModalComponent } from '../../../common-component/confirm-modal/confirm-modal.component';
import { GlobalService } from '../../../services/global/global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdmissionModalComponent } from '../admission-modal/admission-modal.component';
import { Admission } from "../admissiondata";
@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrl: './admission.component.css'
})
export class AdmissionComponent {

  classId: any; // edit object id 
  AdmissionData: any[] = [];  // store all class list
  private activeModal: any;

  constructor(
    private modalService: NgbModal,
    // private classServive: ClassService,
    private global: GlobalService

  ) {

  }

  ngOnInit(): void {

    this.AdmissionData = Admission

  }



  modalData() {
    this.activeModal = this.modalService.open(AdmissionModalComponent, {
      size: "lg",
      backdrop: "static",
      keyboard: false
    })
    this.activeModal.componentInstance.user = "Add";
    this.activeModal.result.then((result: any) => {
      if (result == "Add") {
        // do some work 

      }
    },
      (reason: any) => { }
    )

  }




  // edit function in class component
  edit(list: any) {
    this.activeModal = this.modalService.open(AdmissionModalComponent, {
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
    this.activeModal.componentInstance.user = "Edit";
    this.activeModal.componentInstance.patchData = list;
    this.activeModal.componentInstance.subjectId = this.classId;
    this.activeModal.result.then((result: any) => {
      if (result == "Edit") {

        //  do some work 
      }
    },
      (reason: any) => { }
    )


  }



  // delete function in class component
  //  pass the data or object id in params  
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


  }







}
