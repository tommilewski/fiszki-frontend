import { Component } from "@angular/core";
import { FormService } from "../../../core/services/form.service";
import { FormControl, FormGroup } from "@angular/forms";
import { LoginForm } from "../../../core/models/forms.model";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent {
    hide = true;

    loginForm: FormGroup<LoginForm> = this.formService.initLoginForm();
    constructor(private formService: FormService) {}

    get controls() {
        return this.loginForm.controls;
    }

    getErrorMessage(control: FormControl): string {
        return this.formService.getErrorMessage(control);
    }
}
