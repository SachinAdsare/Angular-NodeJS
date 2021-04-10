import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  token = '';
  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
    this.setToken(this.userValue?.accessToken);
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  setToken(tokenString) {
    this.token = tokenString;
  }
  login(email, password) {
    return this.http
      .post<User>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          this.setToken(user.accessToken);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/auth/register`, user);
  }

  getAll() {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
      }),
    };
    return this.http.get(`${environment.apiUrl}/userpost/all`, options);
  }

  getAllPostByUser() {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
      }),
    };
    return this.http.get(`${environment.apiUrl}/userpost`, options);
  }

  addPost(params) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
      }),
    };
    return this.http.post(`${environment.apiUrl}/userpost/`,params,options).pipe(
      map((x) => {

        return x;
      })
    );
  }

  delete(id: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
      }),
    };
    return this.http.delete(`${environment.apiUrl}/userpost/${id}`,options).pipe(
      map((x) => {
        return x;
      })
    );
  }
}
