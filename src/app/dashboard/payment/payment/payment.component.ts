import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../services/payment/payment.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../../services/common/common.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  data:any[]=[];
  constructor(
    private paymentService:PaymentService,
    private spinner: NgxSpinnerService,
    private commonService:CommonService

  ){}

  ngOnInit(): void {
      this.getPaymentList();
  }

  getPaymentList(){
    this.paymentService.paymentLst().subscribe(res=>{
      console.log(res);
      if(res.success){
        this.data=res.response;
      }
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.commonService.tokenOutOfValid(err)
    })
  }

}
