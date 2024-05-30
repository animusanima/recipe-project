import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {RecipeService} from "../recipes/recipe.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;

  private userSubscription: Subscription;

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService,
              private authService: AuthService,
              private router: Router) {

  }

  ngOnInit(): void {
    // Example of on init comes here
    this.userSubscription = this.authService.userSubject.subscribe(user => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.router.navigate(['recipes']);
      }
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  saveRecipes() {
    this.dataStorageService.saveRecipes();
  }

  loadRecipes() {
    this.dataStorageService.fetchRecipes().subscribe(recipes => {
      this.recipeService.updateRecipes(recipes);
    });
  }

  onLogout() {
    this.authService.logout();
  }

}
