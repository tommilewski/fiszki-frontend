import { Component, OnInit } from "@angular/core";
import { IndexCardResponse } from "../../../core/models/index-cards.model";
import { switchMap } from "rxjs";
import { IndexCardsService } from "../../../core/services/index-cards.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-index-cards-favorites",
    templateUrl: "./index-cards-favorites.component.html",
    styleUrls: ["./index-cards-favorites.component.css"],
})
export class IndexCardsFavoritesComponent implements OnInit {
    indexCards!: IndexCardResponse[];
    username = "";
    errorMessage = "";
    constructor(
        private indexCardsService: IndexCardsService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        if (this.indexCards === undefined) {
            this.route.paramMap
                .pipe(
                    switchMap((param) => {
                        this.username = param.get("username") as string;
                        return this.indexCardsService.getAllFavoritesByUser(
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
    }
}
