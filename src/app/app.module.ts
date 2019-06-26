import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HomeComponent} from './navbar/home/home.component';
import {LoginComponent} from './Users/login/login.component';
import {RegisterComponent} from './Users/register/register.component';
import {appRoutingModule} from './app.routing';
import {BasicAuthInterceptor} from './_helpers/basic-auth.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import { LogoutComponent } from './Users/logout/logout.component';
import { UsersComponent } from './navbar/users/users.component';
import { GamesComponent } from './navbar/games/games.component';
import { ItemsComponent } from './navbar/items/items.component';
import { GroupsComponent } from './navbar/groups/groups.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    UsersComponent,
    GamesComponent,
    ItemsComponent,
    GroupsComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
