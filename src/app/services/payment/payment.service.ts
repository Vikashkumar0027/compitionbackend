import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import *as featureInterface from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
  
  paymentLst(): Observable<any>{
    return this.http.get<any>(`${featureInterface.paymentLst}`);
  }
  
  paymentView(id:any): Observable<any>{
    return this.http.get<any>(`${featureInterface.paymentView}/${id}`);
  }

}
