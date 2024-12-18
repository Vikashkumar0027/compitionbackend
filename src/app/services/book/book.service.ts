import { Injectable } from '@angular/core';

import *as featureInterface from '../interface/interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  
  constructor(private http: HttpClient) { }
  
  bookList(): Observable<any>{
    return this.http.get<any>(`${featureInterface.bookList}`);
  }


  bookAdd(data:any): Observable<any>{
    return this.http.post<any>(featureInterface.bookAdd,data);
  }

  bookUpdate(data:any, id:any): Observable<any>{
    return this.http.patch<any>(`${featureInterface.bookUpdate}/${id}`,data);
  }

  bookDelete(id:any): Observable<any>{
    return this.http.delete<any>(`${featureInterface.bookDelete}/${id}`);
  }
}
