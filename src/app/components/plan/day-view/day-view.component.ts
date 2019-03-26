import {Component, Input, OnInit} from '@angular/core';
import {PlanService} from '../../../services/plan/plan.service';

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
  constructor(private service: PlanService) {
  }

  ngOnInit() {
    this.date = this.Date.toString();
    this.date = this.date.substring(0, 16);
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
