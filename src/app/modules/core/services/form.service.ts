import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginForm, RegisterForm } from "../models/forms.model";
import { equivalentValidator } from "../../shared/validators/equivalent.validator";
import { passwordValidator } from "../../shared/validators/password.validator";

@Injectable({
    providedIn: "root",
})
export class FormService {
    initLoginForm(): FormGroup<LoginForm> {
        return new FormGroup({
            username: new FormControl("", {
                validators: [Validators.required],
                nonNullable: true,
            }),
            password: new FormControl("", {
                validators: [Validators.required],
                nonNullable: true,
            }),
        });
    }

    initRegisterForm(): FormGroup<RegisterForm> {
        return new FormGroup(
            {
                email: new FormControl("", {
                    validators: [Validators.required, Validators.email],
                    nonNullable: true,
                }),
                username: new FormControl("", {
                    validators: [Validators.required],
                    nonNullable: true,
                }),
                password: new FormControl("", {
                    validators: [Validators.required, Validators.minLength(8)],
                    nonNullable: true,
                }),
                repeatedPassword: new FormControl("", {
                    validators: [Validators.required],
                    nonNullable: true,
                }),
            },
            {
                validators: [
                    equivalentValidator("password", "repeatedPassword"),
                    passwordValidator("password"),
                ],
            },
        );
    }

    getErrorMessage(control: FormControl): string {
        if (control.hasError("required")) {
            return "To pole jest wymagane!";
        }

        if (control.hasError("email")) {
            return "Nie poprawny adres e-mail!";
        }

        if (control.hasError("minlength")) {
            return "Hasło musi mieć co najmniej 8 znaków";
        }

        if (control.hasError("passwordNotEqual")) {
            return "Hasła muszą być takie same";
        }

        if (control.hasError("passwordNotEqual")) {
            return "Hasła muszą być takie same";
        }

        if (control.hasError("passwordNotContainGreatLetter")) {
            return "Hasło musi zawierać wielką literę";
        }

        if (control.hasError("passwordNotContainDigit")) {
            return "Hasło musi zawierać cyfre";
        }
        return "";
    }
}
