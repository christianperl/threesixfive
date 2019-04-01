import {Component, OnInit} from '@angular/core';
import {User} from './login/_models';
import {Router} from '@angular/router';
import {AuthenticationService} from './login/_services';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentUser: boolean;
  constructor(
    public router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = true);
  }
  checkTopbar() {
    if (localStorage.getItem('currentUser') !== null) {
      this.currentUser = true;
    }
  }
}
