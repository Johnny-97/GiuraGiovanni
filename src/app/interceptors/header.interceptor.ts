import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const BEARER = localStorage.getItem('BEARER');
    return next.handle(httpRequest.clone({ setHeaders: { 'Authorization': `Bearer ${BEARER}` } }));
  }
}