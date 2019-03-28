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
  entryName;
  serving;
  form = false;
  selectedMeasurement;
  constructor(private service: GroceryListService) {
  }
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
  openForm() {
    this.form = true;
  }
  closeForm() {
    this.form  = false;
  }
  submitForm() {
    const entry =  {'name': this.entryName, 'serving': this.serving, 'measurement' :
      this.selectedMeasurement, 'checked' : false, 'generated' : false};
    this.service.addToList(entry);
    this.entryName = null;
    this.serving = null;
    this.selectedMeasurement = null;
  }
}
