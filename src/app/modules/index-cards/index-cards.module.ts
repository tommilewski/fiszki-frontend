import { NgModule } from "@angular/core";

import { IndexCardsRoutingModule } from "./index-cards-routing.module";
import { IndexCardsFormComponent } from "./components/index-cards-form/index-cards-form.component";
import { SharedModule } from "../shared/shared.module";
import { IndexCardsUsernamePageComponent } from "./components/index-cards-username-page/index-cards-username-page.component";
import { IndexCardsHomeComponent } from "./components/index-cards-home/index-cards-home.component";
import { IndexCardsPageComponent } from "./components/index-cards-page/index-cards-page.component";
import { IndexCardsMatchingComponent } from "./components/index-cards-matching/index-cards-matching.component";

@NgModule({
    declarations: [
        IndexCardsFormComponent,
        IndexCardsUsernamePageComponent,
        IndexCardsHomeComponent,
        IndexCardsPageComponent,
        IndexCardsMatchingComponent,
    ],
    imports: [SharedModule, IndexCardsRoutingModule],
})
export class IndexCardsModule {}
