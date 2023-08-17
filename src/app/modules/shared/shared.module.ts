import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../../material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { IndexCardsListComponent } from "./components/index-cards-list/index-cards-list.component";

@NgModule({
    declarations: [IndexCardsListComponent],
    imports: [CommonModule, MaterialModule],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        IndexCardsListComponent,
    ],
})
export class SharedModule {}
