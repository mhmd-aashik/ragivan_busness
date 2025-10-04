export * from "./product";

export interface CustomerFeedback {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  location: string;
  verified: boolean;
}
