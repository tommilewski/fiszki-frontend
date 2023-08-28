import { Component } from "@angular/core";

@Component({
    selector: "app-friends-list",
    templateUrl: "./friends-list.component.html",
    styleUrls: ["./friends-list.component.css"],
})
export class FriendsListComponent {
    friends: string[] = ["Tomasz Milewski", "Jan Nowak", "Anna Kowalska"];
    isFriendsListOpen = false;

    toggleFriendsList() {
        this.isFriendsListOpen = !this.isFriendsListOpen;
    }
}
