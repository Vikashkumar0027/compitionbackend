import { Injectable } from '@angular/core';
import *as featureInterface from '../interface/interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

  constructor(private http: HttpClient) { }


  // admission List 
  AdmissionList(data: any): Observable<any> {
    return this.http.post<any>(`${featureInterface.admissionList}`, data);
  }

  // admission Post
  AdmissionPost(data: any): Observable<any> {
    return this.http.post<any>(`${featureInterface.admissionAdd}`, data);
  }

  // admission Upload
  AdmissionUpdate(_id: any, data: any): Observable<any> {
    return this.http.patch<any>(`${featureInterface.admissionUpdate}/${_id}`, data);
  }
  // admission Upload
  AdmissionDelete(AdmissionId: any): Observable<any> {
    return this.http.delete<any>(`${featureInterface.admissionDelete}/${AdmissionId}`);
  }


}
