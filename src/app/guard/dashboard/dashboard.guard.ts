import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../../services/common/common.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  constructor(private commonService:CommonService,
    private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    if(this.commonService.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['./login']);
      return false;
    } 
  }
  
}
