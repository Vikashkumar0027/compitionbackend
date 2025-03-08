import { Injectable } from '@angular/core';
import *as featureInterface from '../interface/interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  courseList(): Observable<any> {
    return this.http.get<any>(`${featureInterface.courseList}`);
  }

  courseCreate(data: any): Observable<any> {
    return this.http.post<any>(featureInterface.courseCreate, data);
  }

  courseUpdate(data: any, id: any): Observable<any> {
    return this.http.patch<any>(`${featureInterface.courseUpdate}/${id}`, data);
  }

  courseDelete(id: any): Observable<any> {
    return this.http.delete<any>(`${featureInterface.courseDelete}/${id}`);
  }

}
