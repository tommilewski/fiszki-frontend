import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { RouterLink } from "@angular/router";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { SharedModule } from "../shared/shared.module";
import { FriendsListComponent } from "./components/friends-list/friends-list.component";
import { FriendNotificationsComponent } from "./components/friend-notifications/friend-notifications.component";
import { ChatComponent } from "./components/chat/chat.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        HeaderComponent,
        SpinnerComponent,
        FriendsListComponent,
        FriendNotificationsComponent,
        ChatComponent,
    ],
    imports: [SharedModule, RouterLink, FormsModule],
    exports: [HeaderComponent, SpinnerComponent, FriendsListComponent],
})
export class CoreModule {}
