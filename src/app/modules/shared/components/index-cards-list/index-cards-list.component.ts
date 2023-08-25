import { Component, Input, OnInit } from "@angular/core";
import { IndexCardResponse } from "../../../core/models/index-cards.model";
import { Router } from "@angular/router";
import { IndexCardsService } from "../../../core/services/index-cards.service";
import { AppState } from "../../../../store/app.reducer";
import { Store } from "@ngrx/store";
import { selectAuthUser } from "../../../auth/store/auth.selectors";
import { Observable, of, switchMap } from "rxjs";
import { User } from "../../../core/models/auth.model";

@Component({
    selector: "app-index-cards-list",
    templateUrl: "./index-cards-list.component.html",
    styleUrls: ["./index-cards-list.component.css"],
})
export class IndexCardsListComponent implements OnInit {
    @Input() onlyPublic!: boolean;

    @Input() indexCards!: IndexCardResponse[];

    user$: Observable<User | null> = this.store.select(selectAuthUser);
    username = "";

    updatedList: string[] = [];
    constructor(
        private router: Router,
        private indexCardService: IndexCardsService,
        private store: Store<AppState>,
    ) {}

    ngOnInit() {
        this.user$
            .pipe(
                switchMap((user) => {
                    if (user) {
                        this.username = user.username;
                        return this.indexCardService.getFavoritesByUser(
                            user.username,
                        );
                    } else {
                        return of([]);
                    }
                }),
            )
            .subscribe({
                next: (list) => {
                    this.updatedList = list;
                },
            });
    }

    click(event: Event, id: number) {
        if (this.username === "") {
            this.router.navigate(["/logowanie"]);
            return;
        }

        if (event.target instanceof HTMLElement) {
            if (event.target.tagName !== "MAT-ICON") {
                this.router.navigate(["/fiszka/" + id]);
            }
        }
    }

    toggleLike(id: string) {
        if (this.username === "") {
            this.router.navigate(["/logowanie"]);
            return;
        }

        if (!this.updatedList.includes(id)) {
            this.updatedList.push(id);
        } else {
            this.updatedList = this.updatedList.filter(
                (valueId) => valueId !== id,
            );
        }
        this.indexCardService
            .updateFavourite(this.username, this.updatedList)
            .subscribe();
    }

    protected readonly String = String;
}
