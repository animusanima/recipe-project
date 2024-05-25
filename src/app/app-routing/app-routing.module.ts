import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "../recipes/recipes.component";
import {ShoppingListComponent} from "../shopping-list/shopping-list.component";
import {RecipesStartComponent} from "../recipes/recipe-start/recipes-start.component";
import {RecipeDetailComponent} from "../recipes/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "../recipes/recipe-edit/recipe-edit.component";
import {RecipesResolver} from "../recipes/recipes.resolver";
import {AuthComponent} from "../auth/auth.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    component: RecipesComponent,
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
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    // Example of top-level guarding a navigation destination
    // canActivate: [isAuthenticatedGuard],
    // canActivateChild: [AuthenticatedGuardFn],
    children: [
      {
        path: ':id/edit',
        component: ShoppingListComponent,
        // canDeactivate: [canDeactivateGuard]
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent
  }
  // {
  //   path: 'not-found',
  //   component: ErrorPageComponent,
  //   data: {
  //     message: 'Page not found'
  //   }
  // },
  // {
  //   path: 'unauthorized',
  //   component: UnauthorizedComponent
  // },
  // {
  //   path: '**',
  //   redirectTo: 'not-found'
  // }
];

@NgModule({
  imports: [
    // You can use the configuration {useHash: true}, which places a hash between the root url and the route
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
