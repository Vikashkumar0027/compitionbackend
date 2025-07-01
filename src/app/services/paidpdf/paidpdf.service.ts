import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import *as featureInterface from '../interface/interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaidpdfService {

  constructor(private http: HttpClient) { }
      
    pdfList(): Observable<any>{
        return this.http.get<any>(`${featureInterface.pdfList}`);
      }
    
      pdfAdd(data:any): Observable<any>{
        return this.http.post<any>(featureInterface.pdfAdd,data);
      }
    
      pdfUpdate(data:any, id:any): Observable<any>{
        return this.http.patch<any>(`${featureInterface.pdfUpdate}/${id}`,data);
      }
    
      pdfDelete(id:any): Observable<any>{
        return this.http.delete<any>(`${featureInterface.pdfDelete}/${id}`);
      }
}
