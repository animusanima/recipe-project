import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingredientForm', {static: false}) ingredientForm: NgForm;
  editingSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    // Example of after view init comes here
    this.editingSubscription = this.shoppingListService.startedEditing.subscribe((index) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(this.editedItemIndex);
      this.ingredientForm.setValue({
        'name': this.editedItem.name,
        'indication': this.editedItem.indication,
        'amount': this.editedItem.amount,
      });
    });
  }

  // Using the ViewChild approach to directly access the component bound to in the html
  // And access the values from the components to create an ingredient and emit an event

  OnAddIngredient(ingredientForm: NgForm) {
    const value = ingredientForm.value;
    const ingredientName: string = value.name;
    const ingredientAmount: number = value.amount;
    const ingredientIndication: string = value.indication;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount, ingredientIndication);

    // Signaling an ingredient has been added - is visible to the parent component
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.onClear();
  }

  onClear() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onDeleteItem() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.editingSubscription.unsubscribe();
  }

}
