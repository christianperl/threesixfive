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
  checkedGroceries = new Array<Grocery>();

  addToList(grocery) {
    this.list.push(grocery);
  }

  removeFromList(grocery) {
    this.list.splice(this.list.indexOf(grocery), 1);
  }

  addToCheckedGroceries(grocery) {
    this.checkedGroceries.push(grocery);
  }

  removeFromCheckedGroceries(grocery) {
    this.checkedGroceries.splice(this.checkedGroceries.indexOf(grocery), 1);
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
}
