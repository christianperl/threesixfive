import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {first, map} from 'rxjs/operators';
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
    //this.getWeek(2019, 12);
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
  getSpecificInformation(type) {
    const json = this.json1;
    const result = {};
    const keys = Object.keys(data1);
    const index = keys.indexOf(type);
    result[Object.values(json)[index]['name']] =
      [Object.values(json)[index]['ingredients'], Object.values(json)[index]['directions'], [Object.values(json)[index]['nutrition']]];
    return result;
  }
  sendForm(json) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authentication': JSON.parse(localStorage.getItem('currentUser')).api_token
      })
    };
    this.http.post<any>(`${environment.apiUrl}/form`, json, httpOptions)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log('error');
        });
  }

  getWeek(year, num) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authentication': JSON.parse(localStorage.getItem('currentUser')).api_token
      })
    };
    const url = `${environment.apiUrl}/week/` + year + '/' + num;
    console.log(url);
    return this.http.get(url, httpOptions)
      .pipe(first())
      .subscribe(
        data => {
          this.getTypeAndNameFromWeek(data);
        },
        error => {
          console.log('error');
        });
  }
}
