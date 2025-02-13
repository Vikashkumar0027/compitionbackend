import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from '../services/common/common.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
 token:any;
  constructor(private commonService:CommonService, private loginService:LoginService,
    private route:Router) {
      this.loginService.tokens.subscribe(res => {
        this.token = res;
      })
     
      if(!this.token){
        this.token = localStorage.getItem('compytkns');
      }

    }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);
    if(!this.commonService.isLoggedIn()){
      this.route.navigate(['/']);
    }

    if(request.url){
      if(request.url.indexOf('login') >= 0 || request.url.indexOf('addata') >= 0 ){
        const cloned = request.clone({
          headers: request.headers
          // .set('No-Auth', 'True')
          .set('content-type', 'application/json')
        });
        return next.handle(cloned);
      }else {
        if(this.token) {
          const cloned = request.clone({
            headers: request.headers
            .set('Authorization',this.token)
            // .set('Bearer', this.token)
            // .set('content-type', 'application/json')
          });
          return next.handle(cloned);
        }
      }
    }
    const cloned = request.clone({
      headers: request.headers
      .set('Bearer', this.token)
    });
    return next.handle(cloned);
  }
}
