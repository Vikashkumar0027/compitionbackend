import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import *as featureInterface from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class SyllabusService {

  constructor(private http: HttpClient) { }
  
  syllabusList(): Observable<any>{
    return this.http.get<any>(`${featureInterface.syllabusList}`);
  }


  syllabusCreate(data:any): Observable<any>{
    return this.http.post<any>(featureInterface.syllabusCreate,data);
  }

  syllabusUpdate(data:any, id:any): Observable<any>{
    return this.http.patch<any>(`${featureInterface.syllabusUpdate}/${id}`,data);
  }

  syllabusDelete(id:any): Observable<any>{
    return this.http.delete<any>(`${featureInterface.syllabusDelete}/${id}`);
  }
  
}
