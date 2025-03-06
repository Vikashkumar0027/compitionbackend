import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import *as featureInterface from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

    constructor(private http: HttpClient) { }
      
    holidayList(): Observable<any>{
        return this.http.get<any>(`${featureInterface.holidayList}`);
      }
    
      holidayAdd(data:any): Observable<any>{
        return this.http.post<any>(featureInterface.holidayAdd,data);
      }
    
      holidayUpdate(data:any, id:any): Observable<any>{
        return this.http.patch<any>(`${featureInterface.holidayUpdate}/${id}`,data);
      }
    
      holidayDelete(id:any): Observable<any>{
        return this.http.delete<any>(`${featureInterface.holidayDelete}/${id}`);
      }
}
