import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../_models';
import {environment} from '../../../environments/environment';
import {LumenService} from '../../services/lumen/lumen.service';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  topbar;
  constructor(private http: HttpClient, private lumen: LumenService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/user/login`, {email: email, password: password})
      .pipe(map(user => {
        if (user && 'auth-token' in user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.topbar = true;
          this.currentUserSubject.next(user);
          return user;
        }
        console.log(user);
      }));
  }

  logout() {
    // remove user from local storage to log user out
    this.lumen.logout().subscribe();
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
