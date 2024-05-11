import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  destination: string = 'recipe';
  onNavigate(destination: string) {
    this.destination = destination;
  }
}
