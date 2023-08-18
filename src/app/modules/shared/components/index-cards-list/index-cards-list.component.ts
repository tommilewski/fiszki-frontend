import { Component, Input } from "@angular/core";
import { IndexCardResponse } from "../../../core/models/index-cards.model";
import { Router } from "@angular/router";

@Component({
    selector: "app-index-cards-list",
    templateUrl: "./index-cards-list.component.html",
    styleUrls: ["./index-cards-list.component.css"],
})
export class IndexCardsListComponent {
    @Input() onlyPublic!: boolean;

    @Input() indexCards!: IndexCardResponse[];

    isHeartRed = false;
    constructor(private router: Router) {}

    click(event: Event, id: number) {
        if (event.target instanceof HTMLElement) {
            if (event.target.tagName === "MAT-CARD") {
                this.router.navigate(["/fiszka/" + id]);
            }
        }
    }

    toggleLike() {
        this.isHeartRed = !this.isHeartRed;
    }
}
