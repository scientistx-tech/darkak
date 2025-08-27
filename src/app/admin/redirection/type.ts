export interface Url {
  id: number;
  old_url: string;
  new_url: string;
  date: string; // ISO Date string
}

export interface UrlResponse {
  count: number;
  urls: Url[];
}

export interface UrlRequest {
  old_url: string;
  new_url: string;
}
