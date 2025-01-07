import { Injectable } from '@angular/core';
import *as featureInterface from '../interface/interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiveclassService {

   constructor(private http: HttpClient) { }
    
    getList(): Observable<any>{
      return this.http.get<any>(`${featureInterface.listLive}`);
    }
  
    createLiveClass(data:any): Observable<any>{
      return this.http.post<any>(featureInterface.createLive,data);
    }
  
    liveclassUpdate(data:any, id:any): Observable<any>{
      return this.http.patch<any>(`${featureInterface.patchLive}/${id}`,data);
    }
  
    liveClassDelete(id:any): Observable<any>{
      return this.http.delete<any>(`${featureInterface.deleteLive}/${id}`);
    }

}
