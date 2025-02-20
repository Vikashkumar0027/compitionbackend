import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassService } from '../../../services/class/class.service';
import { GlobalService } from '../../../services/global/global.service';
import { FeeModalComponent } from '../fee-modal/fee-modal.component';
import { ConfirmModalComponent } from '../../../common-component/confirm-modal/confirm-modal.component';
import { CatFeeService } from '../../../services/cat_fee/cat-fee.service';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrl: './fee.component.css'
})
export class FeeComponent {
  classId: any; // edit object id 
  totalClasses: any[] = [];  // store all class list
  private activeModal: any;
  feeType: any;
  feeList: any[] = [ ]

  constructor(
    private modalService: NgbModal,
    private classServive: ClassService,
    private globalService: GlobalService,
    private cat_feeService: CatFeeService

  ) {
    this.getclass();
    this.getfeeList();
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
      if(result == "Add") {
        this.getfeeList();
      }
    },
      (reason: any) => { }
    )

  }


  // get class list 
  getfeeList() {
    this.cat_feeService.feeList().subscribe((res) => {
      if (res.success) {
        this.feeList = res.response;
        console.log("Totals class:-", this.totalClasses);
      }
    }, (error) => {
      console.log(error, "Data is not patch ");
    })
  }


  getclass() {
    this.classServive.classlist().subscribe((res) => {
      if (res.success) {
        this.totalClasses = res.response;
        console.log(this.totalClasses, "totals class");
      }

      console.log(res.data, "response data class list");
    }, (error) => {
      console.log(error, "data is not patch ");
    });
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
        this.getfeeList();
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

    this.cat_feeService.feeDelete(_id).subscribe(res => {
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
