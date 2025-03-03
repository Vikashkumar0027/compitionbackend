import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import *as featureInterface from '../interface/interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) { }
    
  bannerList(): Observable<any>{
      return this.http.get<any>(`${featureInterface.bannerList}`);
    }
  
    bannerAdd(data:any): Observable<any>{
      return this.http.post<any>(featureInterface.bannerAdd,data);
    }
  
    bannerUpdate(data:any, id:any): Observable<any>{
      return this.http.patch<any>(`${featureInterface.bannerUpdate}/${id}`,data);
    }
  
    bannerDelete(id:any): Observable<any>{
      return this.http.delete<any>(`${featureInterface.bannerDelete}/${id}`);
    }
}
