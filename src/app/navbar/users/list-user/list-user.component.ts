import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../_services/user.service';
import {Router} from '@angular/router';
import {User} from '../../../_models/user';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users = [];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe( data => {
        data.forEach(user => this.userService.getUserById(user.id).subscribe(u => {
          u.items = JSON.stringify(u.items);
          u.games = JSON.stringify(u.games);
          this.users.push(u);
      }));
      });
  }



  deleteUser(user: User): void {
    this.userService.deleteUser(user.id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      });
  }

  editUser(user: User): void {
    localStorage.removeItem('editUserId');
    localStorage.setItem('editUser', JSON.stringify(user));
    this.router.navigate(['edit-user']);
  }

  addUser(): void {
    this.router.navigate(['add-user']);
  }
}
