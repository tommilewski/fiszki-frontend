import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FriendNotificationResponse } from "../../models/friend-notifications.model";
import { FriendNotificationsService } from "../../services/friend-notifications.service";
import { ChatService } from "../../services/chat.service";
import { ChatRequest } from "../../models/chat.model";
import { interval, Subscription, switchMap } from "rxjs";

@Component({
    selector: "app-friend-notifications",
    templateUrl: "./friend-notifications.component.html",
    styleUrls: ["./friend-notifications.component.css"],
})
export class FriendNotificationsComponent implements OnInit, OnDestroy {
    isNotificationsExpanded = false;
    @Input() username!: string;

    friendRequests: FriendNotificationResponse[] = [];
    sub!: Subscription;

    constructor(
        private friendNotificationsService: FriendNotificationsService,
        private chatService: ChatService,
    ) {}

    ngOnInit(): void {
        this.sub = interval(1000)
            .pipe(
                switchMap(() =>
                    this.friendNotificationsService.getAllByUsername(
                        this.username,
                    ),
                ),
            )
            .subscribe((value) => {
                this.friendRequests = value;
                this.friendRequests.reverse();
            });
    }

    toggleNotifications() {
        this.isNotificationsExpanded = !this.isNotificationsExpanded;
    }

    acceptFriendRequest(notification: FriendNotificationResponse) {
        this.friendRequests = this.friendRequests.filter(
            (value) => value !== notification,
        );
        const chatRequest: ChatRequest = {
            firstUsername: notification.sender,
            secondUsername: notification.receiver,
        };

        this.friendNotificationsService
            .acceptRequest(notification.id)
            .subscribe({
                next: () => {
                    this.chatService.createNewChat(chatRequest).subscribe();
                },
            });
    }

    rejectFriendRequest(notification: FriendNotificationResponse) {
        this.friendRequests = this.friendRequests.filter(
            (value) => value !== notification,
        );
        this.friendNotificationsService
            .rejectRequest(notification.id)
            .subscribe();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
