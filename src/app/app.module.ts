import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HomeComponent} from './navbar/home/home.component';
import {LoginComponent} from './Users/login/login.component';
import {RegisterComponent} from './Users/register/register.component';
import {appRoutingModule} from './app.routing';
import {BasicAuthInterceptor} from './_helpers/basic-auth.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import { LogoutComponent } from './Users/logout/logout.component';
import {AuthenticationService} from './_services/authentication.service';
import {UserService} from './_services/user.service';
import { AddUserComponent } from './navbar/users/add-user/add-user.component';
import { EditUserComponent } from './navbar/users/edit-user/edit-user.component';
import { ListUserComponent } from './navbar/users/list-user/list-user.component';
import { ListItemComponent } from './navbar/items/list-item/list-item.component';
import { EditItemComponent } from './navbar/items/edit-item/edit-item.component';
import { AddItemComponent } from './navbar/items/add-item/add-item.component';
import { ListGroupComponent } from './navbar/groups/list-group/list-group.component';
import { EditGroupComponent } from './navbar/groups/edit-group/edit-group.component';
import { AddGroupComponent } from './navbar/groups/add-group/add-group.component';
import { AddGameComponent } from './navbar/games/add-game/add-game.component';
import { EditGameComponent } from './navbar/games/edit-game/edit-game.component';
import { ListGameComponent } from './navbar/games/list-game/list-game.component';
import {SearchPipe} from './_helpers/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    ListItemComponent,
    EditItemComponent,
    AddItemComponent,
    ListGroupComponent,
    EditGroupComponent,
    AddGroupComponent,
    AddGameComponent,
    EditGameComponent,
    ListGameComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
