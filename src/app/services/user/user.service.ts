import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import *as featureInterface from '../interface/interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  userList(): Observable<any>{
    return this.http.get<any>(`${featureInterface.userList}`);
  }
  userView(id:any): Observable<any>{
    return this.http.get<any>(`${featureInterface.userView}/${id}`);
  }


  userAdd(data:any): Observable<any>{
    return this.http.post<any>(featureInterface.userAdd,data);
  }

  userUpdate(data:any, id:any): Observable<any>{
    return this.http.patch<any>(`${featureInterface.userUpdate}/${id}`,data);
  }

  userDelete(id:any): Observable<any>{
    return this.http.delete<any>(`${featureInterface.userDelete}/${id}`);
  }
}
