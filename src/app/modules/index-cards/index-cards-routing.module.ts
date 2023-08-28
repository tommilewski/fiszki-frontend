import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexCardsFormComponent } from "./components/index-cards-form/index-cards-form.component";
import { IndexCardsUsernamePageComponent } from "./components/index-cards-username-page/index-cards-username-page.component";
import { IndexCardsHomeComponent } from "./components/index-cards-home/index-cards-home.component";
import { IndexCardsPageComponent } from "./components/index-cards-page/index-cards-page.component";
import { IndexCardsMatchingComponent } from "./components/index-cards-matching/index-cards-matching.component";
import { IndexCardsFavoritesComponent } from "./components/index-cards-favorites/index-cards-favorites.component";

const routes: Routes = [
    { path: "", component: IndexCardsHomeComponent },
    { path: "stworz-fiszke", component: IndexCardsFormComponent },
    {
        path: "konto/:username",
        component: IndexCardsUsernamePageComponent,
    },
    { path: "fiszka/:id", component: IndexCardsPageComponent },
    { path: "dopasowanie/:id", component: IndexCardsMatchingComponent },
    { path: "ulubione/:username", component: IndexCardsFavoritesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IndexCardsRoutingModule {}
