import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IndexCardsService } from "../../../core/services/index-cards.service";
import { switchMap } from "rxjs";

@Component({
    selector: "app-index-cards-matching",
    templateUrl: "./index-cards-matching.component.html",
    styleUrls: ["./index-cards-matching.component.css"],
})
export class IndexCardsMatchingComponent implements OnInit {
    words: string[] = [];
    translations: string[] = [];
    questions: string[] = [];
    randomQuestionsArr: string[] = [];

    errorMessage = "";

    //game state
    current: string[] = [];
    matchedIndexes: number[] = [];
    isGameWon = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private indexCardsService: IndexCardsService,
    ) {}
    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                switchMap((param) => {
                    return this.indexCardsService.getById(
                        param.get("id") as string,
                    );
                }),
            )
            .subscribe({
                next: (indexCard) => {
                    this.words = indexCard.words;
                    this.translations = indexCard.translations;
                    this.questions = this.words.concat(this.translations);
                    this.randomQuestions();
                },
                error: (err) => {
                    this.errorMessage = err;
                    return;
                },
            });
    }

    private randomQuestions() {
        const size = this.questions.length;
        for (let i = 0; i < size; i++) {
            const index = Math.floor(Math.random() * this.questions.length);
            const element = this.questions[index];
            this.randomQuestionsArr.push(element);
            this.questions.splice(index, 1);
        }
    }

    game(text: string, index: number) {
        if (this.current[0] === text || this.matchedIndexes.includes(index)) {
            return;
        }
        this.current.push(text);
        if (this.current.length === 2) {
            let correctIndex = this.words.indexOf(this.current[0]);
            if (correctIndex === -1) {
                correctIndex = this.translations.indexOf(this.current[0]);
            }

            if (
                (this.current[0] === this.words[correctIndex] ||
                    this.current[0] === this.translations[correctIndex]) &&
                (this.current[1] === this.words[correctIndex] ||
                    this.current[1] === this.translations[correctIndex])
            ) {
                this.matchedIndexes.push(
                    this.randomQuestionsArr.indexOf(this.current[0]),
                );
                this.matchedIndexes.push(
                    this.randomQuestionsArr.indexOf(this.current[1]),
                );
            }
            this.current = [];
        }
        if (this.matchedIndexes.length === this.randomQuestionsArr.length) {
            this.isGameWon = true;
        }
    }

    restartGame() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = "reload";
        this.router.navigate([this.router.url]);
    }
}
