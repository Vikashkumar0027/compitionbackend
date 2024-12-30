import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import *as featureInterface from '../interface/interface';
@Injectable({
  providedIn: 'root'
})
export class SubAdminService {

  constructor(private http: HttpClient) { }


  dashboard(): Observable<any>{
    return this.http.get<any>(`${featureInterface.dashboard}`);
  }
  
  subAdminList(): Observable<any>{
    return this.http.get<any>(`${featureInterface.subAdminList}`);
  }

  createSubAdmin(data:any): Observable<any>{
    return this.http.post<any>(featureInterface.createSubAdmin,data);
  }

  subAdminUpdate(data:any, id:any): Observable<any>{
    return this.http.patch<any>(`${featureInterface.subAdminUpdate}/${id}`,data);
  }

  // deleteCompany(id:any): Observable<any>{
  //   return this.http.delete<any>(`${featureInterface.deleteCompany}/${id}`);
  // }
  

  // resetPassword(data:any): Observable<any>{
  //   return this.http.post<any>(featureInterface.resetPassCompany,data);
  // }
}
