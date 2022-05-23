export interface CreateShortUrlInput {
  url: string;
}

export interface ShortUrlResponse {
  data: string;
}

export interface UrlModel {
  originalUrl: string;
  shortUrl: string;
}
