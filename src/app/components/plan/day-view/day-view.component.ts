import {Component, Input, OnInit} from '@angular/core';
import {PlanService} from '../../../services/plan/plan.service';
import {LumenService} from '../../../services/lumen/lumen.service';


@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.scss']
})


export class DayViewComponent implements OnInit {

  @Input() Date;
  date: string;
  recipieView: boolean;
  value;
  dailyMeal;
  dailyMealDetail;
  constructor(private service: PlanService, private lumen: LumenService) {
  }

  ngOnInit() {
    this.lumen.fetchDay(this.Date.toString()).subscribe(
      day => {
        const result = {};
        const keys = Object.keys(day);
        for (let a = 0; a < keys.length; a++) {
          result[keys[a]] = [Object.values(day)[a]['name'], Object.values(day)[a]['description']];
        }
        this.dailyMeal = result;

        console.log(day);

        this.dailyMealDetail = day;
      }
    );
  }

  clickOnRecipie(type) {
    this.recipieView = true;
    this.value = type;
    console.log(this.getSpecificInformation());
  }

  getSpecificInformation() {
    const json = this.dailyMealDetail;
    const result = {};
    const keys = Object.keys(this.dailyMealDetail);
    const index = keys.indexOf(this.value);
    result[Object.values(json)[index]['name']] =
      [Object.values(json)[index]['ingredients'], Object.values(json)[index]['directions'], [Object.values(json)[index]['nutrition']]];
    const key = Object.keys(result)[0];
    return {'key': key, 'values': result[key]};
  }

  cancel() {
    this.recipieView = false;
  }

  getDailyMeal() {
    return this.service.getNameAndDescription();
  }
}

