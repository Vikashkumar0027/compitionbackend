// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { PrivilageService } from '../../services/privilage/privilage.service';
// import { SidenavService } from '../../services/sidnav/sidenav.service';
// import { GlobalService } from '../../services/global/global.service';

// export const subadminGuard: CanActivateFn = (route, state) => {
 
//   return new Promise<boolean>((resolve, reject) => {
   
//     const privalageService = inject(PrivilageService);
//     const sideNavService = inject(SidenavService);
//     const global = inject(GlobalService);
//     const router = inject(Router);
 
//     let sliderAccess: any[] = [];

//     function previlageListapiDatat(){
//     privalageService.previlageLst().subscribe(res=>{
//       console.log(res);
//       privalageService.udateSideBarData(res.response[0].previleges);
//     },err=>{
//       console.log(err)
//     })
//   }
    
   
//     sideNavService.realSideBarAccess.subscribe(res => {
//       sliderAccess = res || [];
//       if(!res){
//         previlageListapiDatat();
//       }
      
//       const snapaurl = router.url;
//       const findUrl = sliderAccess.filter(x => x.url === snapaurl);

//       if (!sliderAccess.length || findUrl.length) {
//         resolve(true);
//       } else {
    
//         global.showToastErorr('You don\'t have access for this page.')
//         // router.navigate(['/','dashboard','home']);
//         resolve(false);
//       }
//     });
//   });
// };


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../../services/common/common.service';
import { SidenavService } from '../../services/sidnav/sidenav.service';
import { PrivilageService } from '../../services/privilage/privilage.service';
import { GlobalService } from '../../services/global/global.service';
// import *as featureInterface from '../interface/interface';
import *as featureInterface from '../../services/interface/interface';

@Injectable({
  providedIn: 'root'
})
export class subadminGuard implements CanActivate {
   sliderAccess: any[] = [];
   list:any[] = featureInterface.sidebar;
  constructor(private commonService:CommonService,
    private sideNavService:SidenavService,
    private privalageService:PrivilageService,
    private global:GlobalService,
    private router:Router
  ){

      this.sideNavService.realSideBarAccess.subscribe(res => {
              if(!res.length){
                this.sliderAccess = res;
              }

  })
}

  

  

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {

  // async canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
   

    if(!this.sliderAccess.length){
 
   this.sliderAccess = await this.commonService.previlageListApiDatat();
    }

    const snapaurl = state.url;
          const findUrl = this.sliderAccess.filter(x => x.url === snapaurl);
    if(findUrl.length>0){
      return true;
    }
    else{
      this.router.navigate(['./dashboard/home']);
      return false;
    } 
  }
  
}

