import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"]
})
export class AlertComponent {

  @Input('message') message: string;
  @Input('detailMessage') detailMessage: string;
  @Output('close') close: EventEmitter<void> = new EventEmitter();

  onClose() {
    this.close.emit();
  }

}
