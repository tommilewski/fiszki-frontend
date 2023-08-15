import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { User } from "../models/auth.model";
import {
    IndexCardRequest,
    IndexCardResponse,
} from "../models/index-cards.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class IndexCardsService {
    apiUrl = `${environment.apiUrl}`;
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
}