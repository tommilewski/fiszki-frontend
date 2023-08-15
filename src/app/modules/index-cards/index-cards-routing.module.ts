import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexCardsFormComponent } from "./components/index-cards-form/index-cards-form.component";
import { IndexCardsUsernamePageComponent } from "./components/index-cards-username-page/index-cards-username-page.component";

const routes: Routes = [
    { path: "stworz-fiszke", component: IndexCardsFormComponent },
    {
        path: "konto/:username",
        component: IndexCardsUsernamePageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IndexCardsRoutingModule {}
