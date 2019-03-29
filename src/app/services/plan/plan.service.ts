import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {first, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import data from './response.json';
import data1 from './response_day.json';
import {LumenService} from '../lumen/lumen.service';
@Injectable({
  providedIn: 'root'
})
export class PlanService {
  clickedDate;
  actualView = 'weekComponent';
  actualDate = new Date();
  json = (<any>data);
  json1 = (<any>data1);

  constructor(private lumen: LumenService) {
  }

  dayIsClicked(date) {
    this.clickedDate = date;
  }

  viewMonth() {
    this.actualView = 'monthComponent';
  }

  viewWeek() {
    this.lumen.fetchWeek(2019, 13).subscribe(
      week => {
        console.log(week);
      }
    );
    this.lumen.fetchDay('2019-03-31').subscribe(
      day => {
        console.log(day);
        const result = {};
        const keys = Object.keys(data1);
        for (let a = 0; a < keys.length; a++) {
          result[keys[a]] = [Object.values(json)[a]['name'], Object.values(json)[a]['description']];
        }
        console.log(result);
      }
    );
    this.actualView = 'weekComponent';
  }

  viewDay() {
    this.actualView = 'dayComponent';
  }

  getTypeAndNameFromWeek() {
    const json = this.json;
    return json;
  }

  getNameAndDescription() {
    let json = this.json1;
    console.log(json);
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
}

