import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ItemService} from '../../../_services/item.service';
import {UserService} from '../../../_services/user.service';
import {Item} from '../../../_models/item';
import {AdminGuard} from '../../../_guards/admin.guard';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  items = [];
  names = [];

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private itemService: ItemService, private userService: UserService, private adminGuard: AdminGuard) { }

  ngOnInit() {
    this.itemService.getItems()
      .subscribe( data => {
        data.forEach(item => this.itemService.getItemById(item._id)
          .pipe()
          .subscribe(u => {
            this.items.push(u);
          }));
      });
  }

  deleteItem(item: Item): void {
    this.itemService.deleteItem(item._id)
      .subscribe( data => {
        this.items = this.items.filter(u => u !== item);
      });
  }

  editItem(item: Item): void {
    localStorage.removeItem('editItem');
    localStorage.setItem('editItem', JSON.stringify(item));
    this.router.navigate(['edit-item']);
  }

  addItem(): void {
    this.router.navigate(['add-item']);
  }
}
