import { Component, OnInit } from "@angular/core";
import { AppState } from "./store/app.reducer";
import { Store } from "@ngrx/store";
import * as AuthActions from "./modules/auth/store/auth.actions";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    title = "learnApp-frontend";

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.store.dispatch(AuthActions.autoLogin());
    }
}
