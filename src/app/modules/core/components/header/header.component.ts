import { Component } from "@angular/core";
import { AppState } from "../../../../store/app.reducer";
import { Store } from "@ngrx/store";
import * as AuthActions from "../../../auth/store/auth.actions";
import { selectAuthUser } from "../../../auth/store/auth.selectors";
import { Observable } from "rxjs";
import { User } from "../../models/auth.model";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
    user$: Observable<User | null> = this.store.select(selectAuthUser);
    isNotificationsExpanded = false;

    friendRequests: any[] = ["tomasz", "ewelina"];
    constructor(private store: Store<AppState>) {}

    logout() {
        this.store.dispatch(AuthActions.logout());
    }

    toggleNotifications() {
        this.isNotificationsExpanded = !this.isNotificationsExpanded;
    }
}
