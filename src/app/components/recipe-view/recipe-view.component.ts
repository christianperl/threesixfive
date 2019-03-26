import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {PlanService} from '../../services/plan/plan.service';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {
  @Input() name: string;
  @Input() view: string;
  @Input() type: string;
  @Input() day: string;
  @Input() descr: string;
  @Input() info: string;
  meal;
  constructor(private service: PlanService) { }

  ngOnInit() {
    this.meal = this.service.getWeek(2019,  12);
  }
  getMeal() {
    return this.meal[this.day];
  }
}
