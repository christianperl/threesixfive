import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SelectItem} from 'primeng/api';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-food-formular',
  templateUrl: './food-formular.component.html',
  styleUrls: ['./food-formular.component.scss']
})
export class FoodFormularComponent implements OnInit {

  foodForm: FormGroup;

  submitted: boolean;

  meals: SelectItem[];

  diets: any[];
  selectedDiets: any;

  allergies: any[];
  selectedAllergie: any;

  nogos: any[];
  selectedNogos: any;

  selectedMeals: string;
  val1 = 1;

  checkmonday: boolean = false;
  checktuesday: boolean = false;
  checkwednesday: boolean = false;
  checkthursday: boolean = false;
  checkfriday: boolean = false;
  checksaturday: boolean = false;
  checksunday: boolean = false;

  formObject;

  constructor(
    private router: Router,
  ) {

    this.meals = [
      {label: 'Breakfast', value: 'Breakfast'},
      {label: 'Lunch', value: 'Lunch'},
      {label: 'Dinner', value: 'Dinner'},
      {label: 'Snack', value: 'Snack'}
    ];

    this.diets = [
      {label: 'Dairy Free', value: 'Dairy Free', diet: 'diary_free.svg'},
      {label: 'Gluten Free', value: 'Gluten Free', diet: 'gluten_free.svg'},
      {label: 'High Protein', value: 'High Protein', diet: 'high_protein.svg'},
      {label: 'Low Calorie', value: 'Low Calorie', diet: 'low_kcal.svg'},
      {label: 'Low Carb', value: 'Low Carb', diet: 'low_carb.svg'}
    ];

    this.allergies = [
      {label: 'Celery', value: 'Celery', name: 'Celery', allergen: 'celery.svg'},
      {label: 'Crustaceans', value: 'Crustaceans', name: 'Crustaceans', allergen: 'crustaceans.svg'},
      {label: 'Egg', value: 'Egg', name: 'Egg', allergen: 'egg.svg'},
      {label: 'Fish', value: 'Fish', name: 'Fish', allergen: 'fish.svg'},
      {label: 'Gluten', value: 'Gluten', name: 'Gluten', allergen: 'gluten.svg'},
      {label: 'Lupines', value: 'Lupines', name: 'Lupines', allergen: 'lupines.svg'},
      {label: 'Lactose', value: 'Lactose', name: 'Lactose', allergen: 'milk.svg'},
      {label: 'Molluscs', value: 'Molluscs', name: 'Molluscs', allergen: 'molluscs.svg'},
      {label: 'Mustard', value: 'Mustard', name: 'Mustard', allergen: 'mustard.svg'},
      {label: 'Nuts', value: 'Nuts', name: 'Nuts', allergen: 'nuts.svg'},
      {label: 'Peanuts', value: 'Peanuts', name: 'Peanuts', allergen: 'peanuts.svg'},
      {label: 'Sesame', value: 'Sesame', name: 'Sesame', allergen: 'sesame.svg'},
      {label: 'Soy', value: 'Soy', name: 'Soy', allergen: 'soy.svg'},
      {label: 'Sulphites', value: 'Sulphites', name: 'Sulphites', allergen: 'sulphites.svg'}
    ];

    this.nogos = [
      {value: 'Beef', label: 'Beef', name: 'Beef', nogo: 'beef.svg'},
      {value: 'Broccoli', label: 'Broccoli', name: 'Broccoli', nogo: 'broccoli.svg'},
      {value: 'Cabbage', label: 'Cabbage', name: 'Cabbage', nogo: 'cabbage.svg'},
      {value: 'Fish', label: 'Fish', name: 'Fish', nogo: 'fish.svg'},
      {value: 'Lamb', label: 'Lamb', name: 'Lamb', nogo: 'lamb.svg'},
      {value: 'Licorice', label: 'Licorice', name: 'Licorice', nogo: 'licorice.svg'},
      {value: 'Mushrooms', label: 'Mushrooms', name: 'Mushrooms', nogo: 'mushrooms.svg'},
      {value: 'Nuts', label: 'Nuts', name: 'Nuts', nogo: 'nuts.svg'},
      {value: 'Pork', label: 'Pork', name: 'Pork', nogo: 'pork.svg'},
      {value: 'Raisin', label: 'Raisin', name: 'Raisin', nogo: 'raisin.svg'},
      {value: 'Seafood', label: 'Seafood', name: 'Seafood', nogo: 'seafood.svg'},
      {value: 'Soy Milk', label: 'Soy Milk', name: 'Soy Milk', nogo: 'soy_drink.svg'},
      {value: 'Soy Nuts', label: 'Soy Nuts', name: 'Soy Nuts', nogo: 'soy_nuts.svg'},
      {value: 'Soy Sauce', label: 'Soy Sauce', name: 'Soy Sauce', nogo: 'soy_sauce.svg'},
      {value: 'Soy Yogurt', label: 'Soy Yogurt', name: 'Soy Yogurt', nogo: 'soy_yoghurt.svg'},
      {value: 'Tofu', label: 'Tofu', name: 'Tofu', nogo: 'tofu.svg'},
      {value: 'Tomatoes', label: 'Tomatoes', name: 'Tomatoes', nogo: 'tomatoes.svg'}
    ];
  }


  clear() {
    this.selectedMeals = null;
  }

  ngOnInit() {
    this.foodForm = new FormGroup(
      {
        persons: new FormControl()
      });
  }

  // Hilfsmethode um values in objekte zu bekommen
  iterateThroughObject(Object) {
    const result: any[] = [];
    for (const value of Object) {
      result.push(value.value);
    }
    return result;
  }

  onSubmit(value: string) {
    this.submitted = true;
    this.router.navigate(['/plan']);
    this.formObject = {
      'diets': this.iterateThroughObject(this.selectedDiets),
      'categories': this.iterateThroughObject(this.selectedNogos),
      'allergens':  this.iterateThroughObject(this.selectedAllergie),
      'plan': ''
    };

    console.log(JSON.stringify(this.formObject));
  }


}
