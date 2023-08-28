import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { FriendNotificationResponse } from "../models/friend-notifications.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class FriendNotificationsService {
    apiUrl = `${environment.apiUrl}/friend-requests`;
    constructor(private http: HttpClient) {}

    getAllByUsername(
        username: string,
    ): Observable<FriendNotificationResponse[]> {
        return this.http.get<FriendNotificationResponse[]>(
            `${this.apiUrl}/get-all/${username}`,
        );
    }

    sendRequest(
        sender: string,
        receiver: string,
    ): Observable<Record<string, never>> {
        const params = new HttpParams()
            .append("sender", sender)
            .append("receiver", receiver);
        return this.http.post<Record<string, never>>(
            `${this.apiUrl}/send`,
            null,
            { params },
        );
    }

    acceptRequest(requestId: number): Observable<Record<string, never>> {
        const params = new HttpParams().append("requestId", requestId);
        return this.http.post<Record<string, never>>(
            `${this.apiUrl}/accept`,
            null,
            {
                params,
            },
        );
    }

    rejectRequest(requestId: number): Observable<Record<string, never>> {
        const params = new HttpParams().append("requestId", requestId);
        return this.http.post<Record<string, never>>(
            `${this.apiUrl}/reject`,
            null,
            {
                params,
            },
        );
    }
}
