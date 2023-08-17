import { Component, Input } from "@angular/core";
import { IndexCardResponse } from "../../../core/models/index-cards.model";

@Component({
    selector: "app-index-cards-list",
    templateUrl: "./index-cards-list.component.html",
    styleUrls: ["./index-cards-list.component.css"],
})
export class IndexCardsListComponent {
    @Input() firstButtonText!: string;
    @Input() secondButtonText!: string;
    @Input() onlyPublic!: boolean;

    @Input() indexCards!: IndexCardResponse[];

    protected readonly myObject = Object;
}
