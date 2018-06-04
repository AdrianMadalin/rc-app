import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {RecipeService} from '../recipes/recipe.service';

import * as firebase from 'firebase';
import {Recipe} from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService) {

    const config = {
      apiKey: 'AIzaSyCjZAbGwkB6cE0gn9mSh6a8YRBZ8judYJ4',
      authDomain: 'ng-recipe-book-fdb19.firebaseapp.com',
      databaseURL: 'https://ng-recipe-book-fdb19.firebaseio.com',
      projectId: 'ng-recipe-book-fdb19',
      storageBucket: 'ng-recipe-book-fdb19.appspot.com',
      messagingSenderId: '205092265160'
    };
    firebase.initializeApp(config);
  }

  public storeRecipes() {
    const url = 'https://ng-recipe-book-eb1d2.firebaseio.com/';
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // return this.http.put(url, this.recipeService.getRecipes(), {headers: headers});
    return this.http.post(url, this.recipeService.getRecipes());
  }

  public storeRecipes2() {
    const database = firebase.database().ref();
    database.set({
      recipes: this.recipeService.getRecipes()
    });
    return database;
  }

  public getRecipes() {
    return firebase.database().ref('recipes');
  }
}
