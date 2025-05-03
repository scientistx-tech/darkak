export interface User {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    password: string;
    dob: string | null;
    gender: string | null;
    isAdmin: boolean;
    image: string | null;
    socketId: string | null;
    pushToken: string | null;
    provider: string;
    token: string | null;
    isModerator: boolean;
    isSeller: boolean;
    updatePasswordAt: string;
    createdAt: string;
  }
  export interface AuthResponse {
    user: User;
    token: string;
  }