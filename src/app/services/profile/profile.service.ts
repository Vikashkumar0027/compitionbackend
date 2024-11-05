import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _profile = new BehaviorSubject<any>(null);

  get profile(){
    return this._profile.asObservable();
  }
  constructor(private http: HttpClient) { }


  getUpdateprofile(data:any){
    try {
  this._profile.next(data);
} catch (error) {
  console.log(error);
}
  }
}
