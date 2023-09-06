import { Component, OnInit } from "@angular/core";
import { FriendsService } from "../../services/friends.service";
import { AppState } from "../../../../store/app.reducer";
import { Store } from "@ngrx/store";
import { selectAuthUser } from "../../../auth/store/auth.selectors";
import {
    debounceTime,
    distinctUntilChanged,
    Observable,
    of,
    switchMap,
} from "rxjs";
import { User } from "../../models/auth.model";
import { UserService } from "../../services/user.service";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { FriendNotificationsService } from "../../services/friend-notifications.service";
import { NotifierService } from "angular-notifier";
import { ChatService } from "../../services/chat.service";

@Component({
    selector: "app-friends-list",
    templateUrl: "./friends-list.component.html",
    styleUrls: ["./friends-list.component.css"],
})
export class FriendsListComponent implements OnInit {
    friends!: string[];
    users!: string[];
    isFriendsListOpen = false;
    activeView = "myFriends";
    username = "";

    user$: Observable<User | null> = this.store.select(selectAuthUser);
    selectedFriend: string | null = null;

    searchFriendsInput: FormControl<string | null> = new FormControl("");
    searchMyFriendsInput: FormControl<string | null> = new FormControl("");

    constructor(
        private friendsService: FriendsService,
        private store: Store<AppState>,
        private userService: UserService,
        private router: Router,
        private friendNotificationsService: FriendNotificationsService,
        private notifierService: NotifierService,
        private chatService: ChatService,
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

        this.searchFriendsInput.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap((value) => {
                    if (value !== "" && value !== null) {
                        return this.userService.findAllByUsernameLike(
                            value.trim(),
                        );
                    }
                    return of([]);
                }),
            )
            .subscribe((value) => {
                this.users = value;
                this.users = this.users.filter((user) => {
                    return (
                        !this.friends.some((friend) => friend === user) &&
                        user !== this.username
                    );
                });
            });

        this.searchMyFriendsInput.valueChanges
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe({
                next: (value) => {
                    console.log(value);
                    if (value !== null) {
                        this.friends = this.friends.filter((username) =>
                            username
                                .toLowerCase()
                                .includes(value.toLowerCase()),
                        );
                    }
                },
            });
    }

    toggleFriendsView(view: string) {
        this.activeView = view;
    }

    removeFriend(friend: string) {
        const index = this.friends.indexOf(friend);
        if (index !== -1) {
            this.friends.splice(index, 1);
        }
        this.friendsService.deleteFriend(this.username, friend).subscribe();
        this.chatService.deleteChatByFriends(this.username, friend).subscribe();
    }

    toggleFriendsList() {
        this.isFriendsListOpen = !this.isFriendsListOpen;
    }

    getInitialLetterCircle(name: string): string {
        return name.charAt(0).toUpperCase();
    }

    selectFriend(friend: string) {
        this.selectedFriend = friend;
    }

    closeChat() {
        this.selectedFriend = null;
    }

    redirectToProfilePage(user: string, event: Event) {
        if (event.target instanceof HTMLElement) {
            if (event.target.tagName !== "MAT-ICON") {
                this.router.navigate([`/konto/${user}`]);
            }
        }
    }

    addToFriend(toUser: string) {
        this.friendNotificationsService
            .sendRequest(this.username, toUser)
            .subscribe({
                next: () => {
                    this.notifierService.notify(
                        "success",
                        "Wysłano prośbę o dodanie do znajomych",
                    );
                },
            });
    }
}
