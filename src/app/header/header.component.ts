import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipeService} from '../recipes/recipe.service';

import 'rxjs/add/operator/map';
import {Recipe} from '../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageSercie: DataStorageService,
              private recipeService: RecipeService) {
  }

  ngOnInit() {
  }

  onSaveData() {
    this.dataStorageSercie.storeRecipes().on('value', (snapshot) => {
      console.log(`Data was saved`);
      console.log(snapshot.val());
    });
  }

  onFetchData() {
    this.dataStorageSercie.getRecipes().on('value', (snapshot) => {
      const recipes: Recipe[] = snapshot.val();
      for (const recipe of recipes) {
        if (!recipe['ingredients']) {
          console.log(recipe);
          recipe['ingredients'] = [];
        }
      }
      this.recipeService.setRecipes(recipes);
      console.log(snapshot.val());
    });
  }
}
