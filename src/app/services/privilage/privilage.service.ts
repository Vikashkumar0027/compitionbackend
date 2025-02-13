import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
// import { Observable } from 'rxjs';
import *as featureInterface from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class PrivilageService {

  private _sidebar = new BehaviorSubject<any>(null);
  
  get sideBarAccess(){
    return this._sidebar.asObservable();
  }

  constructor(private _http: HttpClient,
    private route:Router
  ) { }

  udateSideBarData(val:any){
    //updateSideBar
    this._sidebar.next(val);
   }

   changePassword(param: any) : Observable<any>{
    return this._http.post<any>(`${featureInterface.changePass}`,param);
  }


  previlageLst() : Observable<any> {
    return this._http.get<any>( `${featureInterface.previlageLst}`);
  }



  // crude Previllage


  PrivilegeListAll() : Observable<any> {
    return this._http.get<any>( `${featureInterface.PrivilegeListAll}`);
  }
  PrivilegeList() : Observable<any> {
    return this._http.get<any>( `${featureInterface.PrivilegeList}`);
  }
  
  PrivilegeDelete(id: any)  : Observable<any>{
    return this._http.delete<any>( `${featureInterface.PrivilegeDelete}/${id}`);
  }

  PrivilegeAdd(param: any) : Observable<any>{
    return this._http.post<any>(`${featureInterface.PrivilegeAdd}`,param);
  }
 
  PrivilegeUpdate(param: any,id:any) : Observable<any>{
    return this._http.patch<any>(`${featureInterface.PrivilegeUpdate}/${id}`,param);
  }


}
