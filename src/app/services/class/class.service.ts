import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import *as featureInterface from '../interface/interface';
@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) { }


  classlist(): Observable<any> {
    return this.http.get<any>(`${featureInterface.classes}`);
  }
  createClass(data: any): Observable<any> {
    return this.http.post<any>(`${featureInterface.classes}`, data);
  }
  deleteByiD(classId: any): Observable<any> {
    return this.http.delete<any>(`${featureInterface.classes}/${classId}`);
  }
  editByiD(data: any, classId: any): Observable<any> {
    return this.http.put<any>(`${featureInterface.classes}/${classId}`, data);
  }

}
