import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {RecipeService} from '../recipes/recipe.service';

import * as firebase from 'firebase';
import {AuthService} from '../auth/auth.service';
import {Recipe} from '../recipes/recipe.model';

import 'rxjs/add/operator/map';

@Injectable({providedIn: 'root'})

export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  public storeRecipes() {
    const database = firebase.database().ref();
    database.set({
      recipes: this.recipeService.getRecipes()
    });
    return database;
  }

  public getRecipes() {
    return firebase.database().ref(`recipes`);
  }

  public storeRecipesHttp() {
    const url = 'https://ng-recipe-book-fdb19.firebaseio.com/recipes.json';
    return this.http.put(url, this.recipeService.getRecipes());
  }

  public getRecipesHttp() {
    this.authService.getToken().then((token) => {
      const url = `https://ng-recipe-book-fdb19.firebaseio.com/recipes.json?auth=${token}`;
      this.getRecipesReq(url, token);
    });
  }

  public getRecipesReq(url: string, token: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json').append('Authorization', token);
    this.http.get(url, {headers})
      .map(
        (response: any) => {
          const recipes: Recipe[] = response;
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        })
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
          console.log(recipes);
        }, (err) => {
          console.log(err);
        });
  }
}
