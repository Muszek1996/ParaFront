import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GameService} from '../../../_services/game.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  addForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  // convenience getter for easy access to form fields
  get f() { return this.addForm.controls; }

  constructor(private formBuilder: FormBuilder, private router: Router, private gameService: GameService) {
  }

  ngOnInit() {
    console.log(localStorage.getItem('currentGame'));
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.addForm = this.formBuilder.group({
      _id: [],
      owner: [user.id],
      title: ['', [Validators.minLength(3), Validators.maxLength(15)]],
      description: ['', [Validators.minLength(3), Validators.maxLength(255)]],
      price: ['', [Validators.min(0), Validators.max(999), Validators.pattern('\\b\\d[\\d,.]*\\b')]],
    });

  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }

    this.gameService.addGame(this.addForm.value)
      .subscribe(data => {
          this.router.navigate(['/list-game']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

}
