import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientAdded = new EventEmitter<Ingredient[]>();

  private ingredients = [new Ingredient("Tomato", 1, "ripe")];

  // Receiver of the ingredientAdded event from the shopping-edit component
  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientAdded.emit(this.getIngredients());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  constructor() { }
}
