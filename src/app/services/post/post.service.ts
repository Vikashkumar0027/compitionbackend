import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import *as featureInterface from '../interface/interface';
@Injectable({
  providedIn: 'root'
})
export class PostService {

 
  constructor(private http: HttpClient) { }
  
  postList(): Observable<any>{
    return this.http.get<any>(`${featureInterface.postList}`);
  }


  postAdd(data:any): Observable<any>{
    return this.http.post<any>(featureInterface.postAdd,data);
  }

  postUpdate(data:any, id:any): Observable<any>{
    return this.http.patch<any>(`${featureInterface.postUpdate}/${id}`,data);
  }

  postDelete(id:any): Observable<any>{
    return this.http.delete<any>(`${featureInterface.postDelete}/${id}`);
  }
}
