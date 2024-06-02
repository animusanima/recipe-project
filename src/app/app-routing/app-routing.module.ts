import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  {
    path: '**',
    redirectTo: 'auth'
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
