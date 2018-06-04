import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();
  // public recipes: Recipe[] = [
  //   new Recipe('A test ingName',
  //     'test description',
  //     'https://c1.staticflickr.com/6/5737/30622968353_35e06fcb52_b.jpg',
  //     [
  //       new Ingredient('meat', 10),
  //       new Ingredient('bread', 20),
  //     ]),
  //   new Recipe('Hamburger',
  //     'Beef fries',
  //     'https://anbaa.s3.amazonaws.com/uploads/2017/11/%D8%A8%D8%B1%D8%BA%D8%B1.jpg',
  //     [
  //       new Ingredient('fires', 5),
  //       new Ingredient('bread', 20),
  //     ])
  // ];
  public recipes: Recipe[] = [];

  constructor(private _slService: ShoppingListService) {

  }

  public getRecipes() {
    return this.recipes.slice();
  }

  public setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  public addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this._slService.addIngredients(ingredients);
  }

  public getRecipe(index: number) {
    return this.recipes[index];
  }

  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  public updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  public deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
