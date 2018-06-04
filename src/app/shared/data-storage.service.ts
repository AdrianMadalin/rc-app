import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {RecipeService} from '../recipes/recipe.service';

import * as firebase from 'firebase';
import {AuthService} from '../auth/auth.service';

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
    this.authService.getToken().then((token) => {
      console.log(token);
    }).catch((err) => console.log(err));
    return firebase.database().ref('recipes');
  }
}
