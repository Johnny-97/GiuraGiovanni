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
    const BEARER = '62b659e7b425753ca150ff896c76ebacc1e106472303e8b352e4ed91e028508d';
    console.log(BEARER);
    return next.handle(httpRequest.clone({ setHeaders: { 'Authorization': `Bearer ${BEARER}` } }));
  }
}