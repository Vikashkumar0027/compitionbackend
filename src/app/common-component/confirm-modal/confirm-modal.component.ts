import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../services/global/global.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent implements OnInit {
  @Input() modalContent: any;
  @Input() resetpassword: any;
  // @Output() Updatelogin =new EventEmitter();

  constructor(private activeModal:NgbActiveModal,
    private global: GlobalService) { }

  ngOnInit(): void {
   console.log(this.resetpassword);
  }

  copyMail(param:string){
    this.global.copyMessage(param);
    this.global.showToast('Copied')
}

  modalClose() {
    this.activeModal.close('Cancel');
    // this.Updatelogin.emit('sdsd')
  }

  cancel(){
    // this.Updatelogin.emit('cancel');
    this.activeModal.close('Cancel');
  }
  ok(){
    //this.Updatelogin.emit('login');
    this.activeModal.close('Ok');
  }

}
