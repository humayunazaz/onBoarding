import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  // Get all posts from the API
  getLogin() {
    return this.http.get('/api/staff/login');
      // .map(res => res.json());
  }

  postLogin(user) {
    return this.http.post('/api/staff/login', { 'email': user.email, 'password': user.password});
  }
}