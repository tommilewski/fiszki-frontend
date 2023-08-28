import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class FriendsService {
    apiUrl = `${environment.apiUrl}/friends`;
    constructor(private http: HttpClient) {}

    getAllFriends(username: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/get-all/${username}`);
    }

    deleteFriend(
        username: string,
        userToDelete: string,
    ): Observable<Record<string, never>> {
        const params = new HttpParams().append(
            "usernameToDelete",
            userToDelete,
        );
        return this.http.delete<Record<string, never>>(
            `${this.apiUrl}/delete/${username}`,
            {
                params,
            },
        );
    }
}
