import { Component, OnInit } from "@angular/core";
import { IndexCardsService } from "../../../core/services/index-cards.service";
import { ActivatedRoute } from "@angular/router";
import { Observable, switchMap } from "rxjs";
import { IndexCardResponse } from "../../../core/models/index-cards.model";
import { AppState } from "../../../../store/app.reducer";
import { Store } from "@ngrx/store";
import { selectAuthUser } from "../../../auth/store/auth.selectors";
import { User } from "../../../core/models/auth.model";
import { FriendNotificationsService } from "../../../core/services/friend-notifications.service";
import { NotifierService } from "angular-notifier";

@Component({
    selector: "app-index-cards-username-page",
    templateUrl: "./index-cards-username-page.component.html",
    styleUrls: ["./index-cards-username-page.component.css"],
})
export class IndexCardsUsernamePageComponent implements OnInit {
    indexCards!: IndexCardResponse[];
    username = "";
    senderUsername = "";
    isYourAccount!: boolean;

    user$: Observable<User | null> = this.store.select(selectAuthUser);
    errorMessage = "";
    constructor(
        private indexCardsService: IndexCardsService,
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private friendNotificationsService: FriendNotificationsService,
        private notifierService: NotifierService,
    ) {}

    ngOnInit(): void {
        if (this.indexCards === undefined) {
            this.route.paramMap
                .pipe(
                    switchMap((param) => {
                        this.username = param.get("username") as string;
                        return this.indexCardsService.getAllByUserUsername(
                            this.username,
                        );
                    }),
                )
                .subscribe({
                    next: (value) => {
                        localStorage.setItem(
                            "index-cards",
                            JSON.stringify(value),
                        );
                        this.indexCards = value;
                    },
                    error: (err) => {
                        this.errorMessage = err;
                        return;
                    },
                });
        } else {
            this.indexCards = JSON.parse(
                localStorage.getItem("index-cards") as string,
            );
        }

        this.user$.subscribe({
            next: (user: User | null) => {
                if (user === null) {
                    this.isYourAccount = false;
                } else {
                    this.senderUsername = user.username;
                    this.isYourAccount =
                        user.username.toLowerCase() ===
                        this.username.toLowerCase();
                }
            },
        });
    }

    addToFriend() {
        this.friendNotificationsService
            .sendRequest(this.senderUsername, this.username)
            .subscribe();

        this.notifierService.notify(
            "success",
            "Wysłano prośbę o dodanie do znajomych",
        );
    }
}
