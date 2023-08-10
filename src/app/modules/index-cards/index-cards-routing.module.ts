import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexCardsFormComponent } from "./components/index-cards-form/index-cards-form.component";

const routes: Routes = [
    { path: "stworz-fiszke", component: IndexCardsFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IndexCardsRoutingModule {}
