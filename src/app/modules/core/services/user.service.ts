import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class UserService {
    apiUrl = `${environment.apiUrl}/user`;
    constructor(private http: HttpClient) {}

    findAllByUsernameLike(username: string | null): Observable<string[]> {
        if (username !== null) {
            const params = new HttpParams().append("username", username);
            return this.http.get<string[]>(this.apiUrl, { params });
        }
        return of([]);
    }
}
