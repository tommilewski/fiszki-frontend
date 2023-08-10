import { Component } from "@angular/core";
import { FormService } from "../../../core/services/form.service";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { IndexCardsForm } from "../../../core/models/forms.model";

@Component({
    selector: "app-index-cards-form",
    templateUrl: "./index-cards-form.component.html",
    styleUrls: ["./index-cards-form.component.css"],
})
export class IndexCardsFormComponent {
    indexCardsForm: FormGroup<IndexCardsForm> =
        this.formService.initIndexCardsForm();

    constructor(private formService: FormService) {}

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

    onSubmit() {
        console.log(this.indexCardsForm.getRawValue());
    }
}
