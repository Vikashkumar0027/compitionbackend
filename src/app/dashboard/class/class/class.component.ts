import { Component, OnInit } from '@angular/core';
import { ClassModalComponent } from '../class-modal/class-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassService } from '../../../services/class/class.service';
import { GlobalService } from '../../../services/global/global.service';
import { ConfirmModalComponent } from '../../../common-component/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})
export class ClassComponent implements OnInit {

  classId: any; // edit object id 
  totalClasses: any[] = [];  // store all class list
  private activeModal: any;

  constructor(
    private modalService: NgbModal,
    private classServive: ClassService,
    private global: GlobalService

  ) {
    this.getclass()
  }

  ngOnInit(): void {

  }


  modalData() {
    this.activeModal = this.modalService.open(ClassModalComponent, {
      size: "lg",
      backdrop: "static",
      keyboard: false
    })
    this.activeModal.componentInstance.user = "Add";
    this.activeModal.result.then((result: any) => {
      if (result == "Add") {
        // do some work 
        this.getclass()
      }
    },
      (reason: any) => { }
    )

  }


  // get class list 
  getclass() {

    this.classServive.classlist().subscribe((res) => {
      if (res.success) {
        this.totalClasses = res.data;
        console.log(this.totalClasses, "totals class");
      }

      console.log(res.data, "response data class list");
    }, (error) => {
      console.log(error, "data is not patch ");
      return null
    })


  }

  // edit function in class component
  edit(list: any) {
    this.activeModal = this.modalService.open(ClassModalComponent, {
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
        }
      },
      (reason) => { }
    );
  }




  async deletefunction(_id: any) {

    this.classServive.deleteByiD(_id).subscribe(res => {
      // console.log(res);
      if (res.success) {
        this.getclass()
        this.global.showToast('Deleted');
      }
    },
      (err) => {
        this.global.showToastErorr('something went wrong')
        console.log(err);
      })

  }




  // subjects() { }




}
