import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Group } from '../_models/group';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GroupService {
  constructor(private http: HttpClient) { }

  getGroups() {
    return this.http.get<Group[]>(`${environment.apiUrl}/groups`);
  }

  getGroupById(id: number) {
    return this.http.get<Group>(`${environment.apiUrl}/groups` + '/' + id);
  }

  addGroup(group: Group) {
    return this.http.post(`${environment.apiUrl}/groups`, group);
  }

  updateGroup(group: Group, id: number) {
    return this.http.put(`${environment.apiUrl}/groups/` + id, group);
  }

  deleteGroup(id: number) {
    return this.http.delete(`${environment.apiUrl}/groups` + '/' + id);
  }
}
