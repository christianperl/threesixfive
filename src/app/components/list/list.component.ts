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
  entry = false;
  name;
  measurement;
  serving;
  icon: String = 'pi pi-close';
  editName;
  editMeasurement;
  editServing;
  display = false;
  temporaryItem;
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
  deleteFromCheckedGrocery() {
    this.service.removeFromCheckedList();
  }
  openEntry() {
    this.entry = true;
  }
  closeEntry() {
    this.entry = false;
  }
  addGrocery() {
    this.service.addToList({'name' : this.name, 'serving' : this.serving,
    'measurement' : this.measurement, 'checked' : false, 'generated' : false});
  }
  openEditGrocery(item) {
    this.showDialog();
    this.editName = item.name;
    this.editServing = item.serving;
    this.editMeasurement = item.measurement;
    this.temporaryItem = item;
  }
  showDialog() {
    this.display = true;
  }
  editGrocery() {

    this.display = false;
    this.service.addToList({'name' : this.editName, 'serving' : this.editServing,
      'measurement' : this.editMeasurement, 'checked' : false, 'generated' : false});
    this.deleteGrocery(this.temporaryItem);
  }

}
