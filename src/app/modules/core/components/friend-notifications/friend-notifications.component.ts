import { Component, Input, OnInit } from "@angular/core";
import { FriendNotificationResponse } from "../../models/friend-notifications.model";
import { FriendNotificationsService } from "../../services/friend-notifications.service";

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
    ) {}

    ngOnInit(): void {
        this.friendNotificationsService
            .getAllByUsername(this.username)
            .subscribe({
                next: (value) => (this.friendRequests = value),
            });
    }
    toggleNotifications() {
        this.isNotificationsExpanded = !this.isNotificationsExpanded;
    }

    acceptFriendRequest(id: number) {
        this.friendNotificationsService.acceptRequest(id).subscribe();
    }

    rejectFriendRequest(id: number) {
        this.friendNotificationsService.rejectRequest(id).subscribe();
    }
}
