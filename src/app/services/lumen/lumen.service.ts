import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LumenService {

  constructor(private http: HttpClient) {
  }

  private httpOptionsPost = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authentication': JSON.parse(localStorage.getItem('currentUser'))['auth-token']
    })
  };

  private httpOptions = {
    headers: new HttpHeaders({
      'Authentication': JSON.parse(localStorage.getItem('currentUser'))['auth-token']
    })
  };

  postForm(json) {
    return this.http.post<any>(`${environment.apiUrl}/form`, json, this.httpOptionsPost);
  }

  fetchWeek(year, week) {
    const url = `${environment.apiUrl}/week/` + year + '/' + week;
    console.log(url);
	console.log(JSON.parse(localStorage.getItem('currentUser'))['auth-token']);
	return this.http.get(url, this.httpOptions);
  }

  fetchDay(date) {
    const url = `${environment.apiUrl}/day/` + date;
    return this.http.get(url, this.httpOptions);
  }

  deleteUser() {
    const url = `${environment.apiUrl}/user`;
    return this.http.delete(url, this.httpOptions);
  }

  changeUser(data) {
    const url = `${environment.apiUrl}/user`;
    return this.http.put(url, data, this.httpOptions);
  }

  setGrocery(grocery) {
    return this.http.post<any>(`${environment.apiUrl}/groceries`, grocery, this.httpOptions);
  }

  getAllGroceries() {
    const url = `${environment.apiUrl}/groceries`;
    return this.http.get(url, this.httpOptions);
  }

  getCheckedGroceries() {
    const url = `${environment.apiUrl}/groceries/checked`;
    return this.http.get(url, this.httpOptions);
  }

  getNextGroceries() {
    const url = `${environment.apiUrl}/groceries/next`;
    return this.http.get(url, this.httpOptions);
  }

  pdf(year, week) {
	let httpOption = {
      headers: new HttpHeaders({
        'Authentication': JSON.parse(localStorage.getItem('currentUser'))['auth-token']
      }),
      responseType: 'arraybuffer' as 'json'
    };
    const url = `${environment.apiUrl}/pdf/` + year + '/' + week;
    return this.http.get<any>(url, httpOption);
  }

  regenerate(date, type) {
    return this.http.post<any>(`${environment.apiUrl}/regen`, {date: date, type: type}, this.httpOptions);
  }
}
