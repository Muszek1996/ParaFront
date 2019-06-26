import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {AuthGuard} from './_guards/auth.guard';
import {LoginComponent} from './Users/login/login.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  isLogged: boolean;
  constructor(private auth: AuthGuard, private cdRef: ChangeDetectorRef) {}
  title = 'ParaFront';


  ngAfterViewChecked() {
    this.isLogged = !this.isLoggedIn();
    this.cdRef.detectChanges();
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
}
