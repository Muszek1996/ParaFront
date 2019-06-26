import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../_services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  // convenience getter for easy access to form fields
  get f() { return this.addForm.controls; }

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    console.log(localStorage.getItem('currentUser'));
    this.addForm = this.formBuilder.group({
      id: [],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.minLength(3), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', Validators.required]
    });

  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    } else {
      window.alert('Send!');
    }

    return this.userService.addUser(this.addForm.value)
      .subscribe(data => {

        this.router.navigate(['/list-user']);
      },
        error => {
          this.error = error;
          this.loading = false;
        });

  }

}
