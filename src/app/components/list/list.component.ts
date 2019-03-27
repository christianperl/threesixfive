import { Component, OnInit } from '@angular/core';
import {GroceryListService} from '../../services/grocery-list/grocery-list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list;
  constructor(private service: GroceryListService) { }

  ngOnInit() {
    this.service.getListFromPlan();
    this.list = this.service.list;
  }
}
