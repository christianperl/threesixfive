import { Component, OnInit } from '@angular/core';
import {GroceryListService} from '../../services/grocery-list/grocery-list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list;
  checkedList;
  constructor(private service: GroceryListService) { }

  ngOnInit() {
    this.service.getListFromPlan();
    this.list = this.service.list;
  }
  deleteGrocery(grocery) {
    this.service.removeFromList(grocery);
  }
  checkGrocery(grocery) {
    this.service.moveToCheckedList(grocery);
    this.checkedList = this.service.checkedList;
    this.list = this.service.list;
  }
  deleteFromCheckedGrocery(grocery) {
    this.service.removeFromCheckedList(grocery);
  }
}
