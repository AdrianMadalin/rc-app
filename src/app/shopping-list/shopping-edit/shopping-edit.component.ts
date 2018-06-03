import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from '../shopping-list.service';
import {Ingredient} from '../../shared/ingredient.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  private subscription: Subscription;
  public editMode: Boolean = false;
  public editedItemIndex: number;
  public editedItem: Ingredient;

  constructor(private _slService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this._slService.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this._slService.getIngredientById(index);
      this.slForm.setValue({
        name: this.editedItem['name'],
        amount: this.editedItem['amount']
      });
      console.log(this.slForm.valid);
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this._slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this._slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
    console.log(form);
  }

  onDelete() {
    this._slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
