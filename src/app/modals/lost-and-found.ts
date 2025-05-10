import { Pet } from "./pet";

export  interface LostAndFound {
  id?: number;
  description: string;
  date: string;
  title: string;
  location: string;
  image:string;
  status: string;
  petId?: number;
  pet: Pet
}