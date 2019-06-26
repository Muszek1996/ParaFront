import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {GameService} from '../../../_services/game.service';
import {UserService} from '../../../_services/user.service';
import {Game} from '../../../_models/game';
import {AdminGuard} from '../../../_guards/admin.guard';

@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.component.html',
  styleUrls: ['./list-game.component.css']
})
export class ListGameComponent implements OnInit {

  games = [];
  names = [];

  constructor(private router: Router, private gameService: GameService, private userService: UserService, private adminGuard: AdminGuard) { }

  ngOnInit() {
    this.gameService.getGames()
      .subscribe( data => {
        data.forEach(game => this.gameService.getGameById(game._id)
          .pipe()
          .subscribe(u => {
            this.games.push(u);
          }));
      });
  }

  deleteGame(game: Game): void {
    this.gameService.deleteGame(game._id)
      .subscribe( data => {
        this.games = this.games.filter(u => u !== game);
      });
  }

  editGame(game: Game): void {
    localStorage.removeItem('editGame');
    localStorage.setItem('editGame', JSON.stringify(game));
    this.router.navigate(['edit-game']);
  }

  addGame(): void {
    this.router.navigate(['add-game']);
  }
}
