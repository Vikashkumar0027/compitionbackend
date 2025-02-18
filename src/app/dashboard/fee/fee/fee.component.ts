import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassService } from '../../../services/class/class.service';
import { GlobalService } from '../../../services/global/global.service';
import { FeeModalComponent } from '../fee-modal/fee-modal.component';
import { ConfirmModalComponent } from '../../../common-component/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrl: './fee.component.css'
})
export class FeeComponent {
  classId: any; // edit object id 
  totalClasses: any[] = [];  // store all class list
  private activeModal: any;
  feeType: any
  feeList: any[] = [
    { class: '10th', payment: 4000, status: 'Active' },
    { class: '11th', payment: 3500, status: 'Active' },
    { class: '12th', payment: 5000, status: 'Inactive' },
  ]

  constructor(
    private modalService: NgbModal,
    private classService: ClassService,
    private globalService: GlobalService

  ) {
    this.getclass()
  }

  ngOnInit(): void {

  }


  modalData() {
    this.activeModal = this.modalService.open(FeeModalComponent, {
      size: "lg",
      backdrop: "static",
      keyboard: false
    })
    this.activeModal.componentInstance.user = "Add";
    this.activeModal.result.then((result: any) => {
      if (result) {
        // do some work 
        // this.getclass()
        this.feeList.push(result);
      }
    },
      (reason: any) => { }
    )

  }


  // get class list 
  getclass() {

    this.classService.classlist().subscribe((res) => {
      if (res.success) {
        this.totalClasses = res.data;
        console.log("Totals class:-", this.totalClasses);
      }

      console.log(res.data, "Response data class list");
    }, (error) => {
      console.log(error, "Data is not patch ");
      return null
    })


  }

  // edit function in class component
  edit(list: any) {
    this.activeModal = this.modalService.open(FeeModalComponent, {
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
    this.activeModal.componentInstance.user = "Edit";
    this.activeModal.componentInstance.patchData = list;
    this.activeModal.componentInstance.subjectId = this.classId;
    this.activeModal.result.then((result: any) => {
      if (result == "Edit") {
        this.getclass()
        //  do some work 
      }
    },
      (reason: any) => { }
    )


  }

  // delete function in class component
  //  pass the data or object id in params  
  delete(ind: any) {
    if (confirm("Are you sure for delete?")) {
      this.feeList.splice(ind, 1);
    }

    // const activeModal = this.modalService.open(ConfirmModalComponent, {
    //   size: '',
    //   backdrop: 'static',
    //   keyboard: false,
    // });
    // //data transfer to child
    // const contentObj = {
    //   heading: 'Delete!',
    //   message: 'Are you sure want to Delete ?',
    //   cancel: 'Cancel',
    //   ok: 'Delete'
    // }

    // activeModal.componentInstance.modalContent = contentObj;
    // activeModal.componentInstance.resetpassword = false;

    // activeModal.result.then(
    //   (result) => {

    //     if (result === 'Ok') {
    //       // this.deletefunction(ind);
    //     }
    //   },
    //   (reason) => { }
    // );

  }




  async deletefunction(_id: any) {

    this.classService.deleteByiD(_id).subscribe(res => {
      // console.log(res);
      if (res.success) {
        this.getclass()
        this.globalService.showToast('Deleted');
      }
    },
      (err) => {
        this.globalService.showToastErorr('something went wrong')
        console.log(err);
      })

  }

}
