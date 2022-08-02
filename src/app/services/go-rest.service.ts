import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoRestService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any>{
    return this.http.get('https://gorest.co.in/public-api/users');
  }

  postUser(body: any): Observable<any>{
    return this.http.post('https://gorest.co.in/public-api/users', body);
  }
}
