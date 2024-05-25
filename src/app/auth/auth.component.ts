import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent {

  isLoginMode = false;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  obSubmit(authForm: NgForm) {
    console.log(authForm);
    authForm.reset();
  }

}
