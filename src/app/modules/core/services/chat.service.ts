import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment.development";
import { Observable } from "rxjs";
import {
    ChatRequest,
    ChatResponse,
    MessageRequest,
    MessageResponse,
} from "../models/chat.model";

@Injectable({
    providedIn: "root",
})
export class ChatService {
    apiUrl = `${environment.apiUrl}/chat`;
    constructor(private http: HttpClient) {}

    getByFriends(
        firstUsername: string,
        secondUsername: string,
    ): Observable<ChatResponse> {
        return this.http.get<ChatResponse>(
            `${this.apiUrl}/friends/${firstUsername}/${secondUsername}`,
        );
    }

    createNewChat(chat: ChatRequest): Observable<Record<string, never>> {
        return this.http.post<Record<string, never>>(
            `${this.apiUrl}/add`,
            chat,
        );
    }

    sendMessage(
        message: MessageRequest,
        chatId: number,
    ): Observable<Record<string, never>> {
        return this.http.put<Record<string, never>>(
            `${this.apiUrl}/add/message/${chatId}`,
            message,
        );
    }

    getAllMessagesInChat(chatId: number): Observable<MessageResponse[]> {
        return this.http.get<MessageResponse[]>(
            `${this.apiUrl}/all/messages/chat/${chatId}`,
        );
    }

    deleteChatById(chatId: number): Observable<Record<string, never>> {
        return this.http.delete<Record<string, never>>(
            `${this.apiUrl}/delete/${chatId}`,
        );
    }
}
