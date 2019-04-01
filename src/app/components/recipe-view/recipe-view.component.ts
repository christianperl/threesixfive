import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {PlanService} from '../../services/plan/plan.service';
import {LumenService} from '../../services/lumen/lumen.service';

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
  @Input() meals: any;
  mealNameType;
  constructor(private service: PlanService, private lumen: LumenService) { }

  ngOnInit() {
    this.getMeal();
  }
  getMeal() {
    // return this.meal[this.day];
    this.mealNameType = this.meals;
  }
}
