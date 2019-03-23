import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../login/_models';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import data from './response.json';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  clickedDate;
  actualView = 'weekComponent';
  actualDate = new Date();
  json = (<any>data);

  constructor(private http: HttpClient) {
  }

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
  getTypeAndNameFromWeek() {
    const json = this.json;
    const result = [];
    const keys = Object.keys(data);
    for (let a = 0; a < keys.length; a++) {
        result.push({[keys[a]] : Object.keys(Object.values(json)[a])});
    }

    return json;
  }

  sendForm(json) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authentication': JSON.parse(localStorage.getItem('currentUser')).api_token
      })
    };
    return this.http.post(`${environment.apiUrl}/form`, json, httpOptions)
      .pipe(map(response => {
        console.log(response);
      }));
  }
}
