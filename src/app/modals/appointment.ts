import { Vet } from "../services/vet.service";
import { User } from "./user";

export interface Appointment {
    id?: number;
    date: string;
    description: string;
    status_appointment: string;
    vet: Vet;
    user:User;
}