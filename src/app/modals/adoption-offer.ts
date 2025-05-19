import { Pet } from "./pet";
import { User } from "./user";

export interface AdoptionOffer {
  id?: number;
  title: string;
  description: string;
  date: string;
  location: string;
  status: 'waiting' | 'adopted'; // Match Status_Adoption enum
  validated: boolean;
  image?: string | null;
  pet: Pet;
  user: User;
}
