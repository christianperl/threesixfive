import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './login/_services';


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
