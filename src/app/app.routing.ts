import { HomeComponent } from './navbar/home/home.component';
import { LoginComponent } from './Users/login/login.component';
import { RegisterComponent } from './Users/register/register.component';
import {RouterModule, Routes} from '@angular/router';
import {LogoutComponent} from './Users/logout/logout.component';
import {EditUserComponent} from './navbar/users/edit-user/edit-user.component';
import {ListUserComponent} from './navbar/users/list-user/list-user.component';
import {AddUserComponent} from './navbar/users/add-user/add-user.component';
import {AdminGuard} from './_guards/admin.guard';
import {ListItemComponent} from './navbar/items/list-item/list-item.component';
import {EditGameComponent} from './navbar/games/edit-game/edit-game.component';
import {AddGroupComponent} from './navbar/groups/add-group/add-group.component';
import {ListGroupComponent} from './navbar/groups/list-group/list-group.component';
import {AddItemComponent} from './navbar/items/add-item/add-item.component';
import {AddGameComponent} from './navbar/games/add-game/add-game.component';
import {ListGameComponent} from './navbar/games/list-game/list-game.component';
import {EditItemComponent} from './navbar/items/edit-item/edit-item.component';
import {EditGroupComponent} from './navbar/groups/edit-group/edit-group.component';
import {AuthGuard} from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},


  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'register', component: RegisterComponent},

  { path: 'add-user', component: AddUserComponent, canActivate: [AdminGuard]},
  { path: 'users', component: ListUserComponent, canActivate: [AdminGuard]},
  { path: 'edit-user', component: EditUserComponent , canActivate: [AdminGuard]},

  { path: 'add-game', component: AddGameComponent, canActivate: [AdminGuard]},
  { path: 'list-game', component: ListGameComponent},
  { path: 'edit-game', component: EditGameComponent , canActivate: [AdminGuard]},

  { path: 'add-group', component: AddGroupComponent, canActivate: [AdminGuard]},
  { path: 'list-group', component: ListGroupComponent , canActivate: [AuthGuard]},
  { path: 'edit-group', component: EditGroupComponent , canActivate: [AdminGuard]},

  { path: 'add-item', component: AddItemComponent, canActivate: [AdminGuard]},
  { path: 'list-item', component: ListItemComponent , canActivate: [AuthGuard]},
  { path: 'edit-item', component: EditItemComponent , canActivate: [AdminGuard]},

  { path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);
