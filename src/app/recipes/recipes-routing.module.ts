import {NgModule} from "@angular/core";

import {AuthenticatedGuardFn} from "../auth/auth.guard";
import {RecipesResolver} from "./recipes.resolver";

import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes.component";
import {RecipesStartComponent} from "./recipe-start/recipes-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthenticatedGuardFn],
    canActivateChild: [AuthenticatedGuardFn],
    children: [
      {
        path: '',
        component: RecipesStartComponent,
        resolve: [RecipesResolver]
      },
      {
        path: "new",
        component: RecipeEditComponent,
      },
      {
        path: ":id",
        component: RecipeDetailComponent,
        resolve: [RecipesResolver]
      },
      {
        path: ":id/edit",
        component: RecipeEditComponent,
        resolve: [RecipesResolver]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {

}
