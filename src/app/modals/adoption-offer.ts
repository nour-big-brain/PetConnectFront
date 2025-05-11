import { Pet } from "./pet";
import { User } from "./user";

export interface AdoptionOffer {
    id?: number;
    description: string;
    date: string;
    title: string;
    location: string;
    image:string;
    status: string;
    petId?: number;
    pet: Pet
    user:User;
}
