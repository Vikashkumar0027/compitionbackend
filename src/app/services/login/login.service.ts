import { Injectable } from '@angular/core';
import *as featureInterface from '../interface/interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _token = new BehaviorSubject<any>(null);
  
  get tokens(){
    return this._token.asObservable();
  }
  
  constructor(private http: HttpClient) { }

  udateToken(val:any){
    this._token.next(val);
   }

  login(data:any): Observable<any>{
    return this.http.post<any>(featureInterface.login, data);
   }
   
}
