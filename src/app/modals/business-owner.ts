import { ProfessionalService } from "./professional-service";
import { User } from "./user";

export interface BusinessOwner extends User{
    id?: number;
    firstname: string;
    lastname: string;
    address: string;
    services: ProfessionalService[];

}
