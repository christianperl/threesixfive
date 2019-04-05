import {Injectable} from '@angular/core';
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
    this.actualView = 'weekComponent';
  }

  viewDay() {
    this.actualView = 'dayComponent';
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
