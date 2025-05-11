import { BusinessOwner } from "./business-owner";
import { Service } from "./service";

export interface ProfessionalService extends Service {
    id?: number;
    businessOwners: BusinessOwner[];
    

}