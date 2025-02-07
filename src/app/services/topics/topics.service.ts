import { Injectable } from '@angular/core';
import *as featureInterface from '../interface/interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

 constructor(private http: HttpClient) { }
   
 topicsList(id:any): Observable<any>{
     return this.http.get<any>(`${featureInterface.topicsList}/${id}`);
   }
 
 
   topicsCreate(data:any): Observable<any>{
     return this.http.post<any>(featureInterface.topicsCreate,data);
   }
 
   topicsUpdate(data:any, id:any): Observable<any>{
     return this.http.patch<any>(`${featureInterface.topicsUpdate}/${id}`,data);
   }
 
   topicsDelete(id:any): Observable<any>{
     return this.http.delete<any>(`${featureInterface.topicsDelete}/${id}`);
   }
   
}
