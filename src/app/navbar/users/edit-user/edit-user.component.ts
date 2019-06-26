import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {User} from '../../../_models/user';
import {UserService} from '../../../_services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }

  editForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';


  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('editUser'));
    if (!user) {
      alert('Invalid action.');
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [user.id],
      email: [user.email, [Validators.required, Validators.email]],
      name: [user.name, [Validators.minLength(3), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [user.role, Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }


    this.userService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/users']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

}
