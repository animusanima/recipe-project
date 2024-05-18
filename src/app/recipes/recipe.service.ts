import {Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanges = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      "Tasty Schnitzel",
      "Best meat",
      "https://media.istockphoto.com/id/486565658/de/foto/hausgemachte-paniertes-deutschen-weiner-schnitzel.jpg?s=612x612&w=0&k=20&c=Zrg4mjzV1EDYtNc5Yv7LmL8ieyq9wI2a3jwGpcJiZTc=",
      [
        new Ingredient("Schnitzel", 300, "g"),
        new Ingredient("Fries", 10, "thick"),
        new Ingredient("Sauce Hollandaise", 100, "ml"),
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) {

  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  getRecipes() {
    // copy of the array instead of returning the original array
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanges.next(this.getRecipes());
  }

  updateRecipe(index: number, recipe: Recipe): void {
    this.recipes[index] = recipe;
    this.recipesChanges.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanges.next(this.getRecipes());
  }
}
