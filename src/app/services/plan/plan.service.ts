import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../login/_models';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  clickedDate;
  actualView = 'monthComponent';
  actualDate = new Date();
  constructor(private http: HttpClient) { }
  dayIsClicked(date) {
    this.clickedDate = date;
  }
  viewMonth() {
    this.actualView = 'monthComponent';
  }
  viewWeek() {
    this.actualView = 'weekComponent';
  }
  viewDay() {
    this.actualView = 'dayComponent';
  }
  getDailyMeals(date) {
    // return this.http.get('https://10.19.4.215:8000/api/users');
  }
  sendForm(json) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${environment.apiUrl}/user/register`, json, httpOptions)
      .pipe(map(response => {
          console.log(response);
      }));
  }
 }
