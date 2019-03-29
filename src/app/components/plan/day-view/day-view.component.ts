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
  constructor(private service: PlanService, private lumen: LumenService) {
  }

  ngOnInit() {
    this.lumen.fetchDay('2019-03-31').subscribe(
      day => {
        const result = {};
        const keys = Object.keys(day);
        for (let a = 0; a < keys.length; a++) {
          result[keys[a]] = [Object.values(day)[a]['name'], Object.values(day)[a]['description']];
        }

        this.dailyMeal = result;
      }
    );
  }

  clickOnRecipie(type) {
    this.recipieView = true;
    this.value = type;
    console.log(this.service.getSpecificInformation('breakfast'));
  }
  getInformation() {

    const key = Object.keys(this.service.getSpecificInformation(this.value))[0];
    return {'key': key, 'values': this.service.getSpecificInformation(this.value)[key]};
  }
  cancel() {
    this.recipieView = false;
  }
  getDailyMeal() {
    return this.service.getNameAndDescription();
  }
}
