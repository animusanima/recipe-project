import {Recipe} from "./recipe.model";
import {ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "./recipe.service";

export const RecipesResolver: ResolveFn<Recipe[]> = (route, state) => {
  const dataStorageService = inject(DataStorageService);
  const recipesService = inject(RecipeService);

  const recipes: Recipe[] = recipesService.getRecipes();

  if (recipes.length === 0) {
    return dataStorageService.fetchRecipes();
  } else {
    return recipes;
  }
}
