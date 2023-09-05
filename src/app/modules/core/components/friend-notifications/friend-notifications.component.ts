import { Component, Input, OnInit } from "@angular/core";
import { FriendNotificationResponse } from "../../models/friend-notifications.model";
import { FriendNotificationsService } from "../../services/friend-notifications.service";
import { ChatService } from "../../services/chat.service";
import { ChatRequest } from "../../models/chat.model";

@Component({
    selector: "app-friend-notifications",
    templateUrl: "./friend-notifications.component.html",
    styleUrls: ["./friend-notifications.component.css"],
})
export class FriendNotificationsComponent implements OnInit {
    isNotificationsExpanded = false;
    @Input() username!: string;

    friendRequests: FriendNotificationResponse[] = [];

    constructor(
        private friendNotificationsService: FriendNotificationsService,
        private chatService: ChatService,
    ) {}

    ngOnInit(): void {
        setInterval(() => {
            this.friendNotificationsService
                .getAllByUsername(this.username)
                .subscribe({
                    next: (value) => {
                        this.friendRequests = value;
                    },
                });
        }, 1000);
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
}
