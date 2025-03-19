import { Component } from '@angular/core';
import { ConfirmModalComponent } from '../../../common-component/confirm-modal/confirm-modal.component';
import { GlobalService } from '../../../services/global/global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdmissionModalComponent } from '../admission-modal/admission-modal.component';

import { NgForm } from '@angular/forms';
import { AdmissionviewComponent } from '../admissionview/admissionview.component';
import { AdmissionService } from '../../../services/admission/admission.service';
import { ClassService } from '../../../services/class/class.service';
@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrl: './admission.component.css'
})
export class AdmissionComponent {

  classId: any; // edit object id 
  AdmissionData: any[] = [];  // store all class list
  submitted = false; //search data validate
  viewDataId: any // admission view data id
  formData: any;
  totalClasses: any[] = [];
  private activeModal: any;


  constructor(
    private modalService: NgbModal,
    private global: GlobalService,
    private admissionService: AdmissionService,
    private classServive: ClassService

  ) {
    const formData = { "className": "", "name": "", "rollNo": '', "uniqueId": "", "FatherName": "", "MobileNo": "", "section": "" };
    this.studentList(formData);
    this.getclass();
  }

  ngOnInit(): void {

  }

  // class api list
  getclass() {
    this.classServive.classlist().subscribe((res) => {
      if (res.success) {
        this.totalClasses = res.response;
        console.log(this.totalClasses, "totals class");
      }

      console.log(res.data, "response data class list");
    }, (error) => {
      console.log(error, "data is not patch ");
      return null
    })


  }


  // search student list
  studentList(formData: any) {
    this.admissionService.AdmissionList(formData.value).subscribe(res => {
      if (res.success) {
        this.AdmissionData = res.response;
      }
      console.log(res, "admission data")
    }, err => {
      console.log(err)
    })
  }


  modalData() {
    this.activeModal = this.modalService.open(AdmissionModalComponent, {
      size: "lg",
      backdrop: "static",
      keyboard: false
    })
    this.activeModal.componentInstance.user = "Add";
    this.activeModal.componentInstance.totalClasses = this.totalClasses;
    this.activeModal.result.then((result: any) => {
      if (result == "Add") {
        // do some work 
        this.studentList(this.formData)

      }
    },
      (reason: any) => { }
    )

  }

  // edit function in class component
  edit(list: any, admissionId: any) {
    this.activeModal = this.modalService.open(AdmissionModalComponent, {
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
    this.activeModal.componentInstance.user = "Edit";
    this.activeModal.componentInstance.patchData = list;
    this.activeModal.componentInstance.admissionId = admissionId;
    this.activeModal.result.then((result: any) => {
      if (result == "Edit") {
        this.studentList(this.formData)
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
    activeModal.result.then(
      (result) => {


        if (result === 'Ok') {
          this.deletefunction(param._id);
          this.studentList(this.formData)
        }
      },
      (reason) => { }
    );

  }



  async deletefunction(_id: any) {

    this.admissionService.AdmissionDelete(_id).subscribe(res => {
      // console.log(res);
      if (res.success) {
        this.global.showToast(res.response);
        this.getclass()
      }
    },
      (err) => {
        this.global.showToastErorr('something went wrong')
        console.log(err);
      })

  }



  viewData(AdmissionData: any) {
    this.activeModal = this.modalService.open(AdmissionviewComponent, {
      size: "lg",
      backdrop: "static",
      keyboard: false
    })
    this.activeModal.componentInstance.user = "view";
    this.activeModal.componentInstance.patchData = AdmissionData;
    // this.activeModal.componentInstance.subjectId = this.viewDataId;
    this.activeModal.result.then((result: any) => {
      if (result == "view") {
        // do some work 

      }
    },
      (reason: any) => { }
    )

  }






}
