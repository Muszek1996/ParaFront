import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username, password) {
    const Authorization = 'Basic ' + window.btoa(username + ':' + password);
    const apiUrl = environment.apiUrl;
    const post = this.http.post<any>(`${apiUrl}/users/auth`, { username, password }, {headers: {Authorization}})
      .pipe(map(resp => {
        const token = 'Bearer ' + resp.token;
        const user = resp.user;
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (user) {
          // store user details and basic auth credentials in local storage
          // to keep user logged in between page refreshes
          user.authdata =  token;
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
        return user;
      }));
    return post;
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public isLogged() {
    return this.currentUser !== null;
  }
}
