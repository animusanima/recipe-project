import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  }
)
export class DataStorageService implements OnInit {
  private requestUrl: string = "https://ng-course-recipe-book-2ae0e-default-rtdb.europe-west1.firebasedatabase.app/";
  private recipesEndpoint = "/recipes.json";

  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  ngOnInit(): void {
  }

  saveRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http.put(this.getRecipesEndpoint(), recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(this.getRecipesEndpoint())
      .pipe(map(recipes => {
          return recipes.map(value => {
            return {
              ...value,
              ingredients: value.ingredients ? value.ingredients : []
            }
          });
        }), tap(recipes => {
          this.recipeService.updateRecipes(recipes);
        })
      );
  }

  private getRecipesEndpoint(): string {
    return `${this.requestUrl}/${this.recipesEndpoint}`;
  }

}
