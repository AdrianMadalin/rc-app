import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test name', 'test description', 'https://c1.staticflickr.com/6/5737/30622968353_35e06fcb52_b.jpg'),
    new Recipe('Hamburger', 'Beef fries', 'https://anbaa.s3.amazonaws.com/uploads/2017/11/%D8%A8%D8%B1%D8%BA%D8%B1.jpg')
  ];
  @Output() emitRecipe: EventEmitter<string> = new EventEmitter<string>();
  @Output() recipeWasSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }

  addRecipe() {
    // const messageToEmit = ['A test name', 'test description', 'https://c1.staticflickr.com/6/5737/30622968353_35e06fcb52_b.jpg'];
    this.emitRecipe.emit('mesaj');
    console.log('clicked');
  }

  onRecipeSelected(recipe: Recipe) {
    console.log(recipe);
    this.recipeWasSelected.emit(recipe);
  }

}
