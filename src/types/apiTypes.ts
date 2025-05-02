export type AccessType =
  | "category"
  | "venue"
  | "news"
  | "team"
  | "player"
  | "coach"
  | "event"
  | "fixture"
  | "redirect";

export interface Admin {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isModerator: boolean;
  accessList: AccessType[];
  passwordUpdateAt: string; // ISO date string
}

export interface AdminLoginResponse {
  message: string;
  admin: Admin;
  token: string;
}

export type GameCategory = {
  details: Record<string, any>; // or a more specific type if you know the structure
  name: string;
  image: string;
  news: any[]; // Replace `any` with a specific `News` type if available
};

export type GameCategoryResponse = {
  message: string;
  category: GameCategory;
};

export interface Category {
  name: string;
  image: string;
  id: string;
  images: string[];
  _count: {
    news: number;
  };
}
export interface Venue {
  id: string;
  name: string;
  image: string;
  details: Record<string, any>; // or a more specific type if known
}

export interface VenueResponse {
  venue: Venue;
}
