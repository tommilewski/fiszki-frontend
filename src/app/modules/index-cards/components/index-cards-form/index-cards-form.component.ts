import { Component } from "@angular/core";
import { FormService } from "../../../core/services/form.service";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { IndexCardsForm } from "../../../core/models/forms.model";
import { IndexCardsService } from "../../../core/services/index-cards.service";
import { AppState } from "../../../../store/app.reducer";
import { Store } from "@ngrx/store";
import { selectAuthUser } from "../../../auth/store/auth.selectors";
import { Observable, switchMap } from "rxjs";
import { User } from "../../../core/models/auth.model";
import { NotifierService } from "angular-notifier";
import { Router } from "@angular/router";

@Component({
    selector: "app-index-cards-form",
    templateUrl: "./index-cards-form.component.html",
    styleUrls: ["./index-cards-form.component.css"],
})
export class IndexCardsFormComponent {
    indexCardsForm: FormGroup<IndexCardsForm> =
        this.formService.initIndexCardsForm();

    user$: Observable<User | null> = this.store.select(selectAuthUser);

    constructor(
        private formService: FormService,
        private indexCardsService: IndexCardsService,
        private store: Store<AppState>,
        private notifierService: NotifierService,
        private router: Router,
    ) {}

    get words() {
        return this.indexCardsForm.controls.words as FormArray;
    }

    get translations() {
        return this.indexCardsForm.controls.translations as FormArray;
    }

    get controls() {
        return this.indexCardsForm.controls;
    }

    onAdd() {
        this.words.push(new FormControl("", { nonNullable: true }));
        this.translations.push(new FormControl("", { nonNullable: true }));
    }

    onRemove() {
        const index = this.words.length - 1;
        if (index === 0) {
            return;
        }
        this.words.removeAt(index);
        this.translations.removeAt(index);
    }

    // onSubmit() {
    //     this.user$.subscribe({
    //         next: (user) => {
    //             const username = user?.username as string;
    //             this.indexCardsService
    //                 .addIndexCard(this.indexCardsForm.getRawValue(), username)
    //                 .subscribe({
    //                     next: () => {
    //                         this.router.navigate(["/"]);
    //                         this.notifierService.notify(
    //                             "success",
    //                             "Poprawnie utworzono fiszkę!",
    //                         );
    //                     },
    //                 });
    //         },
    //     });
    // }

    onSubmit() {
        this.user$
            .pipe(
                switchMap((user) => {
                    const username = user?.username as string;
                    return this.indexCardsService.addIndexCard(
                        this.indexCardsForm.getRawValue(),
                        username,
                    );
                }),
            )
            .subscribe({
                next: () => {
                    this.router.navigate(["/"]);
                    this.notifierService.notify(
                        "success",
                        "Poprawnie utworzono fiszkę!",
                    );
                },
            });
    }
}
