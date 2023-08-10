import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { RegisterForm } from "../../../core/models/forms.model";
import { FormService } from "../../../core/services/form.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
    isPasswordHide = true;
    isRepeatedPasswordHide = true;

    registerForm: FormGroup<RegisterForm> = this.formService.initRegisterForm();
    constructor(private formService: FormService) {}

    get controls() {
        return this.registerForm.controls;
    }

    getErrorMessage(control: FormControl): string {
        return this.formService.getErrorMessage(control);
    }
}
