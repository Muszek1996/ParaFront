import { Component, OnInit } from '@angular/core';
import {GroupService} from '../../../_services/group.service';
import {Router} from '@angular/router';
import {Group} from '../../../_models/group';
import {FormGroup} from '@angular/forms';
import {UserService} from '../../../_services/user.service';
import {map} from 'rxjs/operators';
import {AdminGuard} from '../../../_guards/admin.guard';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnInit {

  groups = [];
  names = [];

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private groupService: GroupService, private userService: UserService, private adminGuard: AdminGuard) { }

  ngOnInit() {
    this.groupService.getGroups()
      .subscribe( data => {
        data.forEach(group => this.groupService.getGroupById(group._id)
          .pipe()
          .subscribe(u => {
        this.groups.push(u);
        }));
      });
  }



  deleteGroup(group: Group): void {
    this.groupService.deleteGroup(group._id)
      .subscribe( data => {
        this.groups = this.groups.filter(u => u !== group);
      });
  }

  editGroup(group: Group): void {
    localStorage.removeItem('editGroup');
    localStorage.setItem('editGroup', JSON.stringify(group));
    this.router.navigate(['edit-group']);
  }

  addGroup(): void {
    this.router.navigate(['add-group']);
  }
}
