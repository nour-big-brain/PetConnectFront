import { Post } from "./post";
import { User } from "./user";

export interface LostAndFound extends Post {
  id?: number;
  title: string;
  description: string;
  date: string;
  location: string;
  status: 'lost' | 'found';
  validated?: boolean;
  image?: string;
  user?: User;
  pet?: {
    id?: number;
    name: string;
    age: number;
    breed: string;
    sex: 'male' | 'female';
    description?: string;
  } | null;
}