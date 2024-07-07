export interface User {
    id: string;
    createdAt: Date;
    userName: string;
    email: string;
    avatarUrl: string | null;
    isVerified: boolean;
}