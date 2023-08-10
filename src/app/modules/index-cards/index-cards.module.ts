import { NgModule } from "@angular/core";

import { IndexCardsRoutingModule } from "./index-cards-routing.module";
import { IndexCardsFormComponent } from "./components/index-cards-form/index-cards-form.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [IndexCardsFormComponent],
    imports: [SharedModule, IndexCardsRoutingModule],
})
export class IndexCardsModule {}
