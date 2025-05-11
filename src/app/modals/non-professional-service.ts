import { Service } from "./service";
import { User } from "./user";

export interface NonProfessionalService extends Service{
    id?: number;
    providers:User[];
    
}
