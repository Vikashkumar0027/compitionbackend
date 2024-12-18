import { Component, OnInit } from '@angular/core';
import { PrivilageService } from '../../services/privilage/privilage.service';
// import * as CryptoJS from 'crypto-js';
// import jwt_decode from 'jwt-decode';
import { CommonService } from '../../services/common/common.service';

 // cripto-js setup
  // npm install crypto-js --save
  // npm i --save-dev @types/crypto-js

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit {
  title = 'alfaBackend';
  sideNavStatus: boolean =false;
  decryptedData:any;
  token:any;
  constructor( private privilageService:PrivilageService,
    private commonService:CommonService,
  ) { }

  ngOnInit(): void {
  //  this.dpcript();
  }

  // dpcript(){
  //   this.token = localStorage.getItem('compytkns');
  //   const encruKey ="thisismyCompetitionApplication";
  //   const bytes = CryptoJS.AES.decrypt(this.token, encruKey);
  //   // Convert the decrypted bytes to string (utf8)
  //   this.decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  //   console.log('Decrypted Data:', this.decryptedData);
  //   const decodedToken:any = jwt_decode(this.decryptedData);
  //   console.log(decodedToken);
  //   this.commonService.udateAdminType(decodedToken.data);
  // }

  
}
