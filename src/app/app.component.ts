import { Component, OnInit } from "@angular/core";
import { AppState } from "./store/app.reducer";
import { Store } from "@ngrx/store";
import * as AuthActions from "./modules/auth/store/auth.actions";
import { selectAuthUser } from "./modules/auth/store/auth.selectors";
import { Observable } from "rxjs";
import { User } from "./modules/core/models/auth.model";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    title = "learnApp-frontend";

    user$: Observable<User | null> = this.store.select(selectAuthUser);
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.store.dispatch(AuthActions.autoLogin());
    }
}
