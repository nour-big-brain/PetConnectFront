import { Appointment } from "./appointment";
import { Post } from "./post";

export interface User {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    profilePicture?: string;
    phoneNumber?: string;
    posts?: Post[];
    appointments?: Appointment[];
    
    
}