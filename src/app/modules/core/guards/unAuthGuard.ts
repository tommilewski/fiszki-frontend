import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { map, take } from "rxjs";

export const unAuthGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    return authService.isLoggedIn().pipe(
        take(1),
        map((response) => {
            const isLoggedIn = response.message;
            if (isLoggedIn) {
                router.navigate(["/"]);
                return false;
            }
            return true;
        }),
    );
};
