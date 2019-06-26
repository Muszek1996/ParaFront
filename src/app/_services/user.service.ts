import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAllIds() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getAll() {
    return this.getAllIds();
  }


  getUser(id) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

}
