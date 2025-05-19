import { User } from "./user";

export interface Post {
    id?: number;
    description: string;
    date: string;
    title: string;
    location: string;
    validated?: boolean;
    image?: string;
    user?: User;
}
