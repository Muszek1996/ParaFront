import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item } from '../_models/item';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ItemService {
  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<Item[]>(`${environment.apiUrl}/items`);
  }

  getItemById(id: number) {
    return this.http.get<Item>(`${environment.apiUrl}/items` + '/' + id);
  }

  addItem(item: Item) {
    return this.http.post(`${environment.apiUrl}/items`, item);
  }

  updateItem(item: Item, id: number) {
    return this.http.put(`${environment.apiUrl}/items/` + id, item);
  }

  deleteItem(id: number) {
    return this.http.delete(`${environment.apiUrl}/items` + '/' + id);
  }
}
