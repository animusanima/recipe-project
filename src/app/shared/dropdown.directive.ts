import {Directive, ElementRef, HostBinding, HostListener} from "@angular/core";

@Directive({
  selector: '[appDropDown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean = false;

  @HostListener('document:click', ['$event']) closeDropdown(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  constructor(private elRef: ElementRef) {
  }

}
