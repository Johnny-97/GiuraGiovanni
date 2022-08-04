import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoRestResponse, GoRestUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GoRestService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<GoRestResponse<GoRestUser[]>>('https://gorest.co.in/public-api/users');
  }

  postUser(body: GoRestUser){
    return this.http.post<GoRestResponse<any>>('https://gorest.co.in/public-api/users', body);
  }

  deleteUser(user: GoRestUser){
    return this.http.delete<GoRestResponse<any>>(`https://gorest.co.in/public-api/users/${user.id}`);
  }
}
