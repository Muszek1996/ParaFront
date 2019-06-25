import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './_guards/auth.guard';
import {LogoutComponent} from './logout/logout.component';

const routes: Routes = [
  { path: '', component: HomeComponent,  },
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'register', component: RegisterComponent},

  { path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);
