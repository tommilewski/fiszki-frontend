import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../core/services/auth.service";
import * as AuthActions from "./auth.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";

@Injectable()
export class AuthEffects {
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.login),
            switchMap((action) =>
                this.authService.login(action.loginRequest).pipe(
                    map((user) => {
                        this.router.navigate(["/"]);
                        return AuthActions.loginSuccess({ user });
                    }),
                    catchError((err) =>
                        of(
                            AuthActions.loginFailure({
                                error: err,
                            }),
                        ),
                    ),
                ),
            ),
        );
    });

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.logout),
            switchMap(() =>
                this.authService.logout().pipe(
                    map(() => {
                        this.router.navigate(["/logowanie"]);
                        return AuthActions.logoutSuccess();
                    }),
                    catchError((err) => of(AuthActions.logoutFailure())),
                ),
            ),
        );
    });

    register$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.register),
            switchMap((action) =>
                this.authService.register(action.registerRequest).pipe(
                    map(() => {
                        this.router.navigate(["/logowanie"]);
                        this.notifierService.notify(
                            "success",
                            "Poprawnie założono konto",
                        );
                        return AuthActions.registerSuccess();
                    }),
                    catchError((err) =>
                        of(
                            AuthActions.registerFailure({
                                error: err,
                            }),
                        ),
                    ),
                ),
            ),
        );
    });
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private notifierService: NotifierService,
    ) {}
}
