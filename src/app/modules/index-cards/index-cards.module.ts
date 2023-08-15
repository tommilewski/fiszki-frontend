import { NgModule } from "@angular/core";

import { IndexCardsRoutingModule } from "./index-cards-routing.module";
import { IndexCardsFormComponent } from "./components/index-cards-form/index-cards-form.component";
import { SharedModule } from "../shared/shared.module";
import { IndexCardsUsernamePageComponent } from './components/index-cards-username-page/index-cards-username-page.component';

@NgModule({
    declarations: [IndexCardsFormComponent, IndexCardsUsernamePageComponent],
    imports: [SharedModule, IndexCardsRoutingModule],
})
export class IndexCardsModule {}
