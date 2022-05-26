import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest,
  HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login.service';
import * as dayjs from 'dayjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService, private router: Router) { }

  handleError(error: HttpErrorResponse) {

    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => error);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const data = this.loginService.getToken() || '';
    //console.log(data)
    if (data) {
      const parsedData = JSON.parse(data);
      //console.log(parsedData.token)
      if (!(dayjs().isAfter(dayjs(parsedData.expiry)))) {

        req = req.clone({
          setHeaders: {
            Authorization: "Bearer " + parsedData.token
          }
        })
      }
    }
    return next.handle(req)
      .pipe(
        catchError(this.handleError)
      )
  };
}
