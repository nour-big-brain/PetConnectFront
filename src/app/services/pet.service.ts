import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../modals/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private baseUrl = 'http://localhost:8087'; 

  constructor(private http: HttpClient) { }

  
  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(`${this.baseUrl}/pets`, pet);
  }

  getPetById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.baseUrl}/pets/${id}`);
  }
}
