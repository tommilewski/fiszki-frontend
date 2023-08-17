export interface IUser {
    email: string;
    username: string;
    role: string;
}

export class User implements IUser {
    constructor(
        public email: string,
        public username: string,
        public role: string,
    ) {}
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    username: string;
    password: string;
}

export interface AuthResponse {
    timestamp: string;
    message: string;
    code: string;
}

export interface LoginResponse {
    timestamp: string;
    message: boolean;
    code: string;
}
