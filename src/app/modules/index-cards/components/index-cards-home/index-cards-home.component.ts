import { Component, OnInit } from "@angular/core";
import { IndexCardsService } from "../../../core/services/index-cards.service";
import { IndexCardResponse } from "../../../core/models/index-cards.model";

@Component({
    selector: "app-index-cards-home",
    templateUrl: "./index-cards-home.component.html",
    styleUrls: ["./index-cards-home.component.css"],
})
export class IndexCardsHomeComponent implements OnInit {
    indexCards!: IndexCardResponse[];
    constructor(private indexCardsService: IndexCardsService) {}

    ngOnInit(): void {
        this.indexCardsService.getAllPublic().subscribe({
            next: (value) => {
                this.indexCards = value;
            },
        });
    }
}
