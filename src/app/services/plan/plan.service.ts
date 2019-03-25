import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../login/_models';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import data from './response.json';
import data1 from './response_day.json';
@Injectable({
  providedIn: 'root'
})
export class PlanService {
  clickedDate;
  actualView = 'weekComponent';
  actualDate = new Date();
  json = (<any>data);
  json1 = (<any>data1);
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
  getNameAndDescription() {
    const json = this.json1;
    const result = {};
    const keys = Object.keys(data1);
    for (let a = 0; a < keys.length; a++) {
      result[keys[a]] = [Object.values(json)[a]['name'], Object.values(json)[a]['description']];
    }
    return result;
  }

  sendForm(json) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authentication': JSON.parse(localStorage.getItem('currentUser')).api_token
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/form`, json, httpOptions)
      .pipe(map(response => {
        console.log(response);
      }));
  }
}
