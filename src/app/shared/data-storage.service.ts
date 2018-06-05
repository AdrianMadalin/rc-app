import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {RecipeService} from '../recipes/recipe.service';

import * as firebase from 'firebase';
import {AuthService} from '../auth/auth.service';
import {Recipe} from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})

export class DataStorageService {
  // const url = 'https://ng-recipe-book-fdb19.firebaseio.com/' + '.json';

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
    const url = 'https://ng-recipe-book-fdb19.firebaseio.com/recipes.json';
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url, {headers});
  }
}
