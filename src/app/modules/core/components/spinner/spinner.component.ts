import { Component } from "@angular/core";
import { AppState } from "../../../../store/app.reducer";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectAuthIsLoading } from "../../../auth/store/auth.selectors";

@Component({
    selector: "app-spinner",
    templateUrl: "./spinner.component.html",
    styleUrls: ["./spinner.component.css"],
})
export class SpinnerComponent {
    isLoading$: Observable<boolean> = this.store.select(selectAuthIsLoading);
    constructor(private store: Store<AppState>) {}
}
