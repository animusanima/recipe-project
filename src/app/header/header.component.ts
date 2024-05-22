import {Component, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService) {

  }

  ngOnInit(): void {
    // Example of on init comes here
  }

  saveRecipes() {
    this.dataStorageService.saveRecipes();
  }

  loadRecipes() {
    this.dataStorageService.fetchRecipes().subscribe(recipes => {

    });
  }

}
