import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs';
import *as featureInterface from '../interface/interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OnlineTestService {

  constructor(private _http: HttpClient,
    private route:Router
  ) { }

// Batch APi in Online Test
  batchTestList() : Observable<any> {
    return this._http.get<any>( `${featureInterface.batchTestList}`);
  }

  batchTestAdd(param: any) : Observable<any>{
    return this._http.post<any>(`${featureInterface.batchTestAdd}`,param);
  }

  batchTestUpdate(param: any,id:any) : Observable<any>{
    return this._http.patch<any>(`${featureInterface.batchTestUpdate}/${id}`,param);
  }

  batchTestDelete(id: any)  : Observable<any>{
    return this._http.delete<any>( `${featureInterface.batchTestDelete}/${id}`);
  }


// subject APi in Online Test
subjectTestList(id:any) : Observable<any> {
    return this._http.get<any>(`${featureInterface.subjectTestList}/${id}`);
  }

  subjectTestAdd(param: any) : Observable<any>{
    return this._http.post<any>(`${featureInterface.subjectTestAdd}`,param);
  }

  subjectTestUpdate(param: any,id:any) : Observable<any>{
    return this._http.patch<any>(`${featureInterface.subjectTestUpdate}/${id}`,param);
  }

  subjectTestDelete(id: any)  : Observable<any>{
    return this._http.delete<any>( `${featureInterface.subjectTestDelete}/${id}`);
  }

  
// Set APi in Online Test
setTestList(id:any) : Observable<any> {
    return this._http.get<any>(`${featureInterface.setTestList}/${id}`);
  }

  setTestAdd(param: any) : Observable<any>{
    return this._http.post<any>(`${featureInterface.setTestAdd}`,param);
  }

  setTestUpdate(param: any,id:any) : Observable<any>{
    return this._http.patch<any>(`${featureInterface.setTestUpdate}/${id}`,param);
  }

  setTestDelete(id: any)  : Observable<any>{
    return this._http.delete<any>( `${featureInterface.setTestDelete}/${id}`);
  }

 
}
