export interface IndexCardRequest {
    name: string;
    type: string;
    words: string[];
    translations: string[];
}

export interface IndexCardResponse {
    name: string;
    type: string;
    questions: Map<string, string>;
    username: string;
}
