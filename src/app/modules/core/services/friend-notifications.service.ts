import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { FriendNotificationResponse } from "../models/friend-notifications.model";
import { Observable } from "rxjs";
import { WebSocketSubject } from "rxjs/internal/observable/dom/WebSocketSubject";
import { webSocket } from "rxjs/webSocket";

@Injectable({
    providedIn: "root",
})
export class FriendNotificationsService {
    apiUrl = `${environment.apiUrl}/friend-requests`;
    private socket$: WebSocketSubject<any>;
    constructor(private http: HttpClient) {
        this.socket$ = webSocket("ws://localhost:8080/websocket");
    }

    getAllByUsername(
        username: string,
    ): Observable<FriendNotificationResponse[]> {
        return this.http.get<FriendNotificationResponse[]>(
            `${this.apiUrl}/get-all/${username}`,
        );
    }

    public sendNotification(notification: {
        id: number;
        sender: string;
        receiver: string;
    }): void {
        this.socket$.next(notification);
    }

    public getNotifications(): Observable<any> {
        return this.socket$.asObservable();
    }

    sendRequest(
        sender: string,
        receiver: string,
    ): Observable<Record<string, never>> {
        const params = new HttpParams()
            .append("sender", sender)
            .append("receiver", receiver);

        this.sendNotification({ id: 1, sender, receiver });
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
