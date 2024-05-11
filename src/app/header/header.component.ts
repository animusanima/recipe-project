import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  // @Output() navigationEvent = new EventEmitter<string>();
  //
  // onSelectNavigation(destination: string) {
  //   this.navigationEvent.emit(destination);
  // }

  constructor() {

  }

  ngOnInit(): void {
  }

}
