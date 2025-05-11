import { Pet } from "./pet";
import { Post } from "./post";
import { User } from "./user";


export  interface LostAndFound extends Post{
  id?: number;
  status: string;
  pet: Pet;
}