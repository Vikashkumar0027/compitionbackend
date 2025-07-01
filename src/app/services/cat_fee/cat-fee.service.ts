import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import *as featureInterface from '../interface/interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatFeeService {

  constructor(private http: HttpClient) { }
 
 
  feeList(): Observable<any> {
     return this.http.get<any>(`${featureInterface.feeList}`);
   }
 
   feeAdd(data: any): Observable<any> {
     return this.http.post<any>(`${featureInterface.feeAdd}`, data);
   }
 
   feeDelete(feeId: any): Observable<any> {
     return this.http.delete<any>(`${featureInterface.feeDelete}/${feeId}`);
   }
 
   feeEdit(data: any, feeId: any): Observable<any> {
     return this.http.patch<any>(`${featureInterface.feeEdit}/${feeId}`, data);
   }
 
}
