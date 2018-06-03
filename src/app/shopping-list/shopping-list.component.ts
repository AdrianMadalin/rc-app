import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Ingredient[] = [];
  private subscription: Subscription;

  constructor(private _shoppingService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this._shoppingService.getIngredients();
    this.subscription = this._shoppingService.ingredientsChanged.subscribe((ingredient: Ingredient[]) => {
      this.ingredients = ingredient;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditItem(index) {
    this._shoppingService.startedEditing.next(index);
  }
}
