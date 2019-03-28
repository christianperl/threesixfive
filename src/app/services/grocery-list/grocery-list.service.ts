import {Injectable} from '@angular/core';
import {Grocery} from '../../modals/grocery';
import data from './groceries.json';

@Injectable({
  providedIn: 'root'
})

export class GroceryListService {
  json = (<any>data);
  constructor() {
  }

  list;
  checkedList = new Array();

  addToList(grocery) {
    this.list.push(grocery);
  }

  removeFromList(grocery) {
    this.list.splice(this.list.indexOf(grocery), 1);
}
  getListFromPlan() {
    const json = this.json;
    const result = [];
    const keys = Object.keys(data);
    for (let a = 0; a < json.length; a++) {
      result.push(json[a]);
    }
    this.list = result;
  }
  moveToCheckedList(grocery) {
    this.checkedList.push(grocery);
    this.removeFromList(grocery);
  }
  removeFromCheckedList(grocery) {
    this.checkedList.splice(this.list.indexOf(grocery), 1);
  }
}
