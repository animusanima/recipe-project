import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements AfterViewInit {
  // Binding to a component in the html file
  @ViewChild('nameInput', {static: false}) name: ElementRef;
  @ViewChild('amountInput', {static: false}) amount: ElementRef;
  @ViewChild('indicationInput', {static: false}) indication: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  ngAfterViewInit(): void {
  }
  // Using the ViewChild approach to directly access the component bound to in the html
  // And access the values from the components to create an ingredient and emit an event

  OnAddIngredient() {
    const ingredientName: string = this.name.nativeElement.value;
    const ingredientAmount: number = this.amount.nativeElement.value;
    const ingredientIndication: string = this.indication.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount, ingredientIndication);

    // Signaling an ingredient has been added - is visible to the parent component
    this.shoppingListService.addIngredient(newIngredient);
  }

}
