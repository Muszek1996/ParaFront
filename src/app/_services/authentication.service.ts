import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {handleError} from '../_helpers/error.handler';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public currentUser: Observable<any>;
  private currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username, password) {
    const Authorization = 'Basic ' + window.btoa(username + ':' + password);
    const apiUrl = environment.apiUrl;
    const post = this.http.post<any>(`${apiUrl}/users/auth`, {username, password}, {headers: {Authorization}})
      .pipe(map(resp => {
        const token = 'Bearer ' + resp.token;
        const user = resp.user;
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (user) {
          // store user details and basic auth credentials in local storage
          // to keep user logged in between page refreshes
          user.authdata = token;
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
        return user;
      }));
    return post;
  }

  register(email, password, username?) {
    const apiUrl = environment.apiUrl;
    const post = this.http.post<any>(`${apiUrl}/users`, {email, password, username})
      .pipe(map(resp => {
        const token = 'Bearer ' + resp.token;
        const user = resp.user;
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (user) {
          // store user details and basic auth credentials in local storage
          // to keep user logged in between page refreshes
          user.authdata = token;
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

}

