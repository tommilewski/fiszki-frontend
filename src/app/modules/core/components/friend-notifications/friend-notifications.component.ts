import { Component, Input, OnInit } from "@angular/core";
import { FriendNotificationResponse } from "../../models/friend-notifications.model";
import { FriendNotificationsService } from "../../services/friend-notifications.service";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: "app-friend-notifications",
    templateUrl: "./friend-notifications.component.html",
    styleUrls: ["./friend-notifications.component.css"],
})
export class FriendNotificationsComponent implements OnInit {
    isNotificationsExpanded = false;
    @Input() username!: string;
    friendRequestsSubject = new BehaviorSubject<string>("test");

    friendRequests: FriendNotificationResponse[] = [];

    constructor(
        private friendNotificationsService: FriendNotificationsService,
    ) {}

    ngOnInit(): void {
        this.friendNotificationsService
            .getAllByUsername(this.username)
            .subscribe({
                next: (value) => {
                    this.friendRequestsSubject.next("powiadomienie");
                    this.friendRequests = value;
                },
            });
    }
    toggleNotifications() {
        this.isNotificationsExpanded = !this.isNotificationsExpanded;
    }

    acceptFriendRequest(notification: FriendNotificationResponse) {
        this.friendRequestsSubject.next("");
        this.friendRequests = this.friendRequests.filter(
            (value) => value !== notification,
        );
        this.friendNotificationsService
            .acceptRequest(notification.id)
            .subscribe();
    }

    rejectFriendRequest(notification: FriendNotificationResponse) {
        this.friendRequestsSubject.next("");
        this.friendRequests = this.friendRequests.filter(
            (value) => value !== notification,
        );
        this.friendNotificationsService
            .rejectRequest(notification.id)
            .subscribe();
    }
}
