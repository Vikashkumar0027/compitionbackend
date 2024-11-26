import { Injectable } from '@angular/core';
import *as featureInterface from '../interface/interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private http: HttpClient) { }
  
  chapterList(id:any): Observable<any>{
    return this.http.get<any>(`${featureInterface.chapterList}/${id}`);
  }


  chapterCreate(data:any): Observable<any>{
    return this.http.post<any>(featureInterface.chapterCreate,data);
  }

  chapterUpdate(data:any, id:any): Observable<any>{
    return this.http.patch<any>(`${featureInterface.chapterUpdate}/${id}`,data);
  }

  chapterDelete(id:any): Observable<any>{
    return this.http.delete<any>(`${featureInterface.chapterDelete}/${id}`);
  }
  
}
