import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import {
    IndexCardRequest,
    IndexCardResponse,
} from "../models/index-cards.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class IndexCardsService {
    apiUrl = `${environment.apiUrl}/index-cards`;
    constructor(private http: HttpClient) {}

    getAllByUserUsername(username: string): Observable<IndexCardResponse[]> {
        const params = new HttpParams().append("username", username);
        return this.http.get<IndexCardResponse[]>(`${this.apiUrl}/getAll`, {
            params,
        });
    }

    addIndexCard(indexCardRequest: IndexCardRequest, username: string) {
        const params = new HttpParams().append("username", username);
        return this.http.post(`${this.apiUrl}/add`, indexCardRequest, {
            params,
        });
    }

    getAllPublic(): Observable<IndexCardResponse[]> {
        return this.http.get<IndexCardResponse[]>(`${this.apiUrl}/all`);
    }

    getById(id: string): Observable<IndexCardResponse> {
        return this.http.get<IndexCardResponse>(`${this.apiUrl}/get/${id}`);
    }

    getAllFavoritesByUser(username: string): Observable<IndexCardResponse[]> {
        return this.http.get<IndexCardResponse[]>(
            `${this.apiUrl}/get-all/favorites/${username}`,
        );
    }

    getFavoritesByUser(username: string): Observable<string[]> {
        return this.http.get<string[]>(
            `${this.apiUrl}/get/favorite/${username}`,
        );
    }

    updateFavourite(
        username: string,
        updatedList: string[],
    ): Observable<Record<string, never>> {
        return this.http.patch<Record<string, never>>(
            `${this.apiUrl}/update/favorite/${username}`,
            updatedList,
        );
    }
}
