import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import *as featureInterface from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class PrevoiusPaperService {

  
  constructor(private http: HttpClient) { }
  
  previousList(): Observable<any>{
    return this.http.get<any>(`${featureInterface.previousList}`);
  }
  previousView(id:any): Observable<any>{
    return this.http.get<any>(`${featureInterface.previousView}/${id}`);
  }
  previousCreate(data:any): Observable<any>{
    return this.http.post<any>(featureInterface.previousCreate,data);
  }
  previousUpdate(data:any, id:any): Observable<any>{
    return this.http.patch<any>(`${featureInterface.previousUpdate}/${id}`,data);
  }
  previousPdfAdd(data:any, id:any): Observable<any>{
    return this.http.post<any>(`${featureInterface.previousPdfAdd}/${id}`,data);
  }
  previousPdfUpdate(data:any, previousId:any,id:any): Observable<any>{
    return this.http.patch<any>(`${featureInterface.previousPdfUpdate}/${previousId}/${id}`,data);
  }

  previousDelete(id:any): Observable<any>{
    return this.http.delete<any>(`${featureInterface.previousDelete}/${id}`);
  }
  previousPdfDelete(id:any,pdfId:any): Observable<any>{
    return this.http.delete<any>(`${featureInterface.previousPdfDelete}/${id}/${pdfId}`);
  }



  // chapterUpdate(data:any, id:any): Observable<any>{
  //   return this.http.patch<any>(`${featureInterface.chapterUpdate}/${id}`,data);
  // }

 
}
