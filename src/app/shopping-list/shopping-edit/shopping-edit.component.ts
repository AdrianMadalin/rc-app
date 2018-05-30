import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput;
  @ViewChild('amountInput') amountInput;
  @Output() newIngredient: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

  constructor() {
  }

  ngOnInit() {
  }

  onAddIngredient() {
    if (this.nameInput.nativeElement.value.length > 0 && this.amountInput.nativeElement.value > 0) {
      this.newIngredient.emit(new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value));
      this.nameInput.nativeElement.value = '';
      this.amountInput.nativeElement.value = '';
    } else {
      console.log(`EMPTY INPUT`);
    }
  }

}
