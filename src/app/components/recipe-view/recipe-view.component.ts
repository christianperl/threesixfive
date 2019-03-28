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
  mealNameType;
  constructor(private service: PlanService) { }

  ngOnInit() {
    this.getMeal();
  }
  getMeal() {
    // return this.meal[this.day];
    this.mealNameType = this.service.getTypeAndNameFromWeek()[this.day];
  }
}
