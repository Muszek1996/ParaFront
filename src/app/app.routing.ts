import { HomeComponent } from './navbar/home/home.component';
import { LoginComponent } from './Users/login/login.component';
import { RegisterComponent } from './Users/register/register.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './_guards/auth.guard';
import {LogoutComponent} from './Users/logout/logout.component';
import {UsersComponent} from './navbar/users/users.component';
import {GamesComponent} from './navbar/games/games.component';
import {ItemsComponent} from './navbar/items/items.component';
import {GroupsComponent} from './navbar/groups/groups.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  { path: 'groups', component: GroupsComponent},
  { path: 'games', component: GamesComponent},
  { path: 'items', component: ItemsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'register', component: RegisterComponent},

  { path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);
