import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getUserById(id: any) {
    return this.http.get<User>(`${environment.apiUrl}/users` + '/' + id);
  }

  createUser(user: User) {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }

  addUser(user: User) {
    return this.http.post(`${environment.apiUrl}/users/add`, user);
  }

  updateUser(user: User) {
    return this.http.put(`${environment.apiUrl}/users`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.apiUrl}/users` + '/' + id);
  }
}
