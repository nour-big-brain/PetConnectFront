export interface AdoptionOffer {
    id?: number;
    description: string;
    date: string;
    title: string;
    location: string;
    status: string;
    petId?: number;
    pet: {
      id: number;
      name: string;
      breed: string;
      age: number;
      sex: string;
      description: string;
    };
}
