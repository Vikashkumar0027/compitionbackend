import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import *as featureInterface from '../interface/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrarySubCriptionService {

   constructor(private http: HttpClient) { }
      
      librarySubList(): Observable<any>{
        return this.http.get<any>(`${featureInterface.librarySubList}`);
      }
    
      librarySubAdd(data:any): Observable<any>{
        return this.http.post<any>(featureInterface.librarySubAdd,data);
      }
    
      librarySubUpdate(data:any, id:any): Observable<any>{
        return this.http.patch<any>(`${featureInterface.librarySubUpdate}/${id}`,data);
      }
    
      librarySubDelete(id:any): Observable<any>{
        return this.http.delete<any>(`${featureInterface.librarySubDelete}/${id}`);
      }
  

  
}
