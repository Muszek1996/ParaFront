import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Game } from '../_models/game';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(private http: HttpClient) { }

  getGames() {
    return this.http.get<Game[]>(`${environment.apiUrl}/games`);
  }

  getGameById(id: number) {
    return this.http.get<Game>(`${environment.apiUrl}/games` + '/' + id);
  }

  addGame(game: Game) {
    return this.http.post(`${environment.apiUrl}/games`, game);
  }

  updateGame(game: Game, id: any) {
    delete game._id
    return this.http.put(`${environment.apiUrl}/games/` + id, game);
  }

  deleteGame(id: number) {
    return this.http.delete(`${environment.apiUrl}/games` + '/' + id);
  }
}
