export interface IndexCardRequest {
    name: string;
    type: string;
    words: string[];
    translations: string[];
}

export interface IndexCardResponse {
    id: number;
    name: string;
    type: string;
    words: string[];
    translations: string[];
    username: string;
    usersWhoFavorite: string[];
}
