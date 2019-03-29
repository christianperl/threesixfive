import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {first, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LumenService {

  constructor(private http: HttpClient) { }

  postForm(json) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authentication': JSON.parse(localStorage.getItem('currentUser'))['auth-token']
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/form`, json, httpOptions);
  }

  fetchWeek(year, num) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authentication': JSON.parse(localStorage.getItem('currentUser'))['auth-token']
      })
    };
    const url = `${environment.apiUrl}/week/` + year + '/' + num;
    return this.http.get(url, httpOptions);
        }

    fetchDay(date) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authentication': JSON.parse(localStorage.getItem('currentUser'))['auth-token']
        })
      };
      const url = `${environment.apiUrl}/day/` + date;
      return this.http.get(url, httpOptions);
  }
}
