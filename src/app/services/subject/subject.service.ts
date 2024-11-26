import { Injectable } from '@angular/core';
import *as featureInterface from '../interface/interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  
  constructor(private http: HttpClient) { }


  subjectList(id:any): Observable<any>{
    return this.http.get<any>(`${featureInterface.subjectList}/${id}`);
  }

  subjectCreate(data:any): Observable<any>{
    return this.http.post<any>(featureInterface.subjectCreate,data);
  }

  subjectUpdate(data:any, id:any): Observable<any>{
    return this.http.patch<any>(`${featureInterface.subjectUpdate}/${id}`,data);
  }

  subjectDelete(id:any): Observable<any>{
    return this.http.delete<any>(`${featureInterface.subjectDelete}/${id}`);
  }

  
}
