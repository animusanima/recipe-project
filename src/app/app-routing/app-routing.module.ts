import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "../shopping-list/shopping-list.component";
import {AuthComponent} from "../auth/auth.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: '**',
    redirectTo: '/auth'
  }

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
