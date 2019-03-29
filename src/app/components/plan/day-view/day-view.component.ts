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

        ['breakfast', 'lunch', 'main dish', 'snack'].forEach(type => {
          const keys2 = Object.keys(day);
          const index = keys2.indexOf(type);
          result[Object.values(day)[index]['name']] =
            [Object.values(day)[index]['ingredients'], Object.values(day)[index]['directions'], [Object.values(day)[index]['nutrition']]];
        });
      }
    );
  }

  clickOnRecipie(type) {
    this.recipieView = true;
    this.value = type;
    // console.log(this.service.getSpecificInformation('breakfast'));
  }
  getInformation() {
    const key = Object.keys(this.dailyMeal[this.value])[0];
    return {'key': key, 'values': this.dailyMeal[this.value][key]};
  }
  cancel() {
    this.recipieView = false;
  }
  getDailyMeal() {
    return this.service.getNameAndDescription();
  }
}
