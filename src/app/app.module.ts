import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgOptimizedImage} from "@angular/common";
import {RouterLinkActive} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {AuthInterceptorService} from "./auth/auth-interceptor/auth-interceptor.service";
import {AuthComponent} from "./auth/auth.component";
import {HeaderComponent} from './header/header.component';
import {RecipesModule} from "./recipes/recipes.module";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    RouterLinkActive,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
