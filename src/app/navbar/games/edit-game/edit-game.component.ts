import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GameService} from '../../../_services/game.service';
import {Game} from '../../../_models/game';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {


  game: Game;
  constructor(private formBuilder: FormBuilder, private router: Router, private gameService: GameService) { }

  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }

  editForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';


  ngOnInit() {
    const game = JSON.parse(localStorage.getItem('editGame'));
    if (!game) {
      alert('Invalid action.');
      this.router.navigate(['list-game']);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      title: [game.title, [Validators.minLength(3), Validators.maxLength(45)]],
      description: [game.description, [Validators.minLength(3), Validators.maxLength(255)]],
      price: [game.price, [Validators.min(0), Validators.max(999), Validators.pattern('\\b\\d[\\d,.]*\\b')]],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }
    const game = JSON.parse(localStorage.getItem('editGame'));

      console.log(game._id);
    this.gameService.updateGame(this.editForm.value, game._id)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/list-game']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

}
