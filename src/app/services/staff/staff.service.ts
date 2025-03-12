import { Injectable } from '@angular/core';
import *as staffInterface from '../interface/interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http: HttpClient) { }

  staffList(): Observable<any> {
    return this.http.get<any>(`${staffInterface.staffList}`);
  }

  staffAdd(data: any): Observable<any> {
    return this.http.post<any>(staffInterface.staffAdd, data);
  }

  staffUpdate(data: any, id: any): Observable<any> {
    return this.http.patch<any>(`${staffInterface.staffUpdate}/${id}`, data);
  }

  staffDelete(id: any): Observable<any> {
    return this.http.delete<any>(`${staffInterface.staffDelete}/${id}`);
  }

}
