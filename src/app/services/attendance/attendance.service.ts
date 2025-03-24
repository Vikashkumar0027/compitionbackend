import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import *as attendanceIf from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  attendanceList(): Observable<any> {
    return this.http.get<any>(`${attendanceIf.attendanceList}`);
  }

  attendanceAdd(data: any): Observable<any> {
    return this.http.post<any>(attendanceIf.attendanceAdd, data);
  }

  attendanceUpdate(data: any, id: any): Observable<any> {
    return this.http.patch<any>(`${attendanceIf.attendanceUpdate}/${id}`, data);
  }

  attendanceDelete(id: any): Observable<any> {
    return this.http.delete<any>(`${attendanceIf.attendanceDelete}/${id}`);
  }
  attendanceView(id: any): Observable<any> {
    return this.http.delete<any>(`${attendanceIf.attendanceView}/${id}`);
  }
}
