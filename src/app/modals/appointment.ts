import { Vet } from "../services/vet.service";
import { User } from "./user";

export interface Appointment {
    id?: number;
    date: string;
    description: string;
    status_appointment: string;
    vetId: String,
     username: string;
    profilePicture: string;
}