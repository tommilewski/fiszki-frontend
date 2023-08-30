export interface ChatResponse {
    id: number;
    firstUsername: string;
    secondUsername: string;
    messages: MessageResponse[];
}

export interface MessageResponse {
    sender: string;
    date: Date;
    message: string;
}

export interface ChatRequest {
    firstUsername: string;
    secondUsername: string;
}

export interface MessageRequest {
    sender: string;
    message: string;
}
