import { Component, OnDestroy } from "@angular/core";
import { FormService } from "../../../core/services/form.service";
import { FormControl, FormGroup } from "@angular/forms";
import { LoginForm } from "../../../core/models/forms.model";
import { AppState } from "../../../../store/app.reducer";
import { Store } from "@ngrx/store";
import * as AuthActions from "..//../store/auth.actions";
import { Observable } from "rxjs";
import { selectAuthError } from "../../store/auth.selectors";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnDestroy {
    hide = true;

    loginForm: FormGroup<LoginForm> = this.formService.initLoginForm();
    errorMessage$: Observable<string | null> =
        this.store.select(selectAuthError);
    constructor(
        private formService: FormService,
        private store: Store<AppState>,
    ) {}

    get controls() {
        return this.loginForm.controls;
    }

    getErrorMessage(control: FormControl): string {
        return this.formService.getErrorMessage(control);
    }

    onLogin() {
        this.store.dispatch(
            AuthActions.login({ loginRequest: this.loginForm.getRawValue() }),
        );
    }

    ngOnDestroy(): void {
        this.store.dispatch(AuthActions.clearError());
    }
}
