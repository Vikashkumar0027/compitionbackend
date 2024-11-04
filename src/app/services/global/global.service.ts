import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private toastr: ToastrService){}

  showToast(message: string ){
     this.toastr.success(message)
  }
  showToastErorr(message: string ){
     this.toastr.error(message)
  }
  showToastInfo(message: string ){
     this.toastr.info(message)
  }
  showToastWarning(message: string ){
     this.toastr.warning(message)
  }

  copyMessage(val: string){
   const selBox = document.createElement('textarea');
   selBox.style.position = 'fixed';
   selBox.style.left = '0';
   selBox.style.top = '0';
   selBox.style.opacity = '0';
   selBox.value = val;
   document.body.appendChild(selBox);
   selBox.focus();
   selBox.select();
   document.execCommand('copy');
   document.body.removeChild(selBox);
 }
}
