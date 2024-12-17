import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private _realRidebar = new BehaviorSubject<any>(null);
  
  get realSideBarAccess(){
    return this._realRidebar.asObservable();
  }
  constructor() { }


  udateRealSideBarData(val:any){
    this._realRidebar.next(val);
   }

}
