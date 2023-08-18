import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs";
import { IndexCardsService } from "../../../core/services/index-cards.service";

@Component({
    selector: "app-index-cards-page",
    templateUrl: "./index-cards-page.component.html",
    styleUrls: ["./index-cards-page.component.css"],
})
export class IndexCardsPageComponent implements OnInit {
    isFlipped = false;
    words: string[] = [];
    translations: string[] = [];
    currentQuestionIndex = 0;
    errorMessage = "";
    cardId = "";

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private indexCardsService: IndexCardsService,
    ) {}
    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                switchMap((param) => {
                    this.cardId = param.get("id") as string;
                    return this.indexCardsService.getById(this.cardId);
                }),
            )
            .subscribe({
                next: (indexCard) => {
                    this.words = indexCard.words;
                    this.translations = indexCard.translations;
                },
                error: (err) => {
                    this.errorMessage = err;
                    return;
                },
            });
    }

    toggleFlip() {
        this.isFlipped = !this.isFlipped;
    }

    prevQuestion() {
        this.isFlipped = false;
        setTimeout(() => {
            this.currentQuestionIndex =
                (this.currentQuestionIndex - 1 + this.words.length) %
                this.words.length;
        }, 300);
    }

    nextQuestion() {
        this.isFlipped = false;
        setTimeout(() => {
            this.currentQuestionIndex =
                (this.currentQuestionIndex + 1) % this.words.length;
        }, 300);
    }

    navigateToMatchingGame() {
        this.router.navigate(["/dopasowanie/" + this.cardId]);
    }
}
