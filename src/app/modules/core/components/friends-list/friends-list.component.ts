import { Component, OnInit } from "@angular/core";
import { FriendsService } from "../../services/friends.service";
import { AppState } from "../../../../store/app.reducer";
import { Store } from "@ngrx/store";
import { selectAuthUser } from "../../../auth/store/auth.selectors";
import { Observable, of, switchMap } from "rxjs";
import { User } from "../../models/auth.model";

@Component({
    selector: "app-friends-list",
    templateUrl: "./friends-list.component.html",
    styleUrls: ["./friends-list.component.css"],
})
export class FriendsListComponent implements OnInit {
    friends!: string[];
    isFriendsListOpen = false;
    activeView = "myFriends";
    username = "";

    user$: Observable<User | null> = this.store.select(selectAuthUser);

    constructor(
        private friendsService: FriendsService,
        private store: Store<AppState>,
    ) {}

    ngOnInit(): void {
        this.user$
            .pipe(
                switchMap((user) => {
                    if (user) {
                        this.username = user.username;
                        return this.friendsService.getAllFriends(user.username);
                    }
                    return of([]);
                }),
            )
            .subscribe({ next: (value) => (this.friends = value) });
    }

    toggleFriendsView(view: string) {
        this.activeView = view;
    }

    removeFriend(friend: string) {
        const index = this.friends.indexOf(friend);
        if (index !== -1) {
            this.friends.splice(index, 1);
        }
        this.friendsService.deleteFriend(this.username, friend).subscribe({
            next: (value) => console.log(value),
        });
    }

    toggleFriendsList() {
        this.isFriendsListOpen = !this.isFriendsListOpen;
    }

    getInitialLetterCircle(name: string): string {
        return name.charAt(0).toUpperCase();
    }
}
