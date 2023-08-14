import { Component, OnDestroy } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { RegisterForm } from "../../../core/models/forms.model";
import { FormService } from "../../../core/services/form.service";
import { AppState } from "../../../../store/app.reducer";
import { Store } from "@ngrx/store";
import * as AuthActions from "..//../store/auth.actions";
import { Observable } from "rxjs";
import { selectAuthError } from "../../store/auth.selectors";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnDestroy {
    isPasswordHide = true;
    isRepeatedPasswordHide = true;

    registerForm: FormGroup<RegisterForm> = this.formService.initRegisterForm();

    errorMessage$: Observable<string | null> =
        this.store.select(selectAuthError);

    constructor(
        private formService: FormService,
        private store: Store<AppState>,
    ) {}

    get controls() {
        return this.registerForm.controls;
    }

    getErrorMessage(control: FormControl): string {
        return this.formService.getErrorMessage(control);
    }

    onRegister() {
        const { email, username, password } = this.registerForm.getRawValue();

        this.store.dispatch(
            AuthActions.register({
                registerRequest: { email, username, password },
            }),
        );
    }

    ngOnDestroy(): void {
        this.store.dispatch(AuthActions.clearError());
    }
}
