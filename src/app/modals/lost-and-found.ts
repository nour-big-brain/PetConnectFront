import { Pet } from "./pet";

export  interface LostAndFound {
    id?: number;
    description: string;
    date: string;
    title: string;
    location: string;
    status: string; // Status_LostAndFound (e.g., "LOST" or "FOUND")
    pet: Pet;
    image?: string; // Base64-encoded image
  }