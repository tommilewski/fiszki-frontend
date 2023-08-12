import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment.development";
import {
    AuthResponse,
    IUser,
    LoginRequest,
    RegisterRequest,
} from "../models/auth.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    apiUrl = `${environment.apiUrl}/auth`;
    constructor(private http: HttpClient) {}

    login(loginRequest: LoginRequest): Observable<IUser> {
        return this.http.post<IUser>(`${this.apiUrl}/login`, loginRequest, {
            withCredentials: true,
        });
    }

    logout(): Observable<AuthResponse> {
        return this.http.get<AuthResponse>(`${this.apiUrl}/logout`, {
            withCredentials: true,
        });
    }

    register(registerRequest: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(
            `${this.apiUrl}/register`,
            registerRequest,
        );
    }
}
