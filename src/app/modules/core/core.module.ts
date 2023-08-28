import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { RouterLink } from "@angular/router";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { SharedModule } from "../shared/shared.module";
import { FriendsListComponent } from "./components/friends-list/friends-list.component";

@NgModule({
    declarations: [HeaderComponent, SpinnerComponent, FriendsListComponent],
    imports: [SharedModule, RouterLink],
    exports: [HeaderComponent, SpinnerComponent, FriendsListComponent],
})
export class CoreModule {}
