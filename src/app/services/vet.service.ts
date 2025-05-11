import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vet {
  id?: number;
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  phoneNumber: string;
  address: string;
  posts?: any[];
  appointments?: any[];
  nonProfessionalServices?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class VetService {
  private apiUrl = 'http://localhost:8087/vets';

  constructor(private http: HttpClient) {}

  createVet(vet: Vet): Observable<Vet> {
    return this.http.post<Vet>(this.apiUrl, vet);
  }

  getAllVets(): Observable<Vet[]> {
    return this.http.get<Vet[]>(this.apiUrl);
  }

  getVetById(id: number): Observable<Vet> {
    return this.http.get<Vet>(`${this.apiUrl}/${id}`);
  }

  updateVet(id: number, vet: Vet): Observable<Vet> {
    return this.http.put<Vet>(`${this.apiUrl}/${id}`, vet);
  }

  deleteVet(id: number): Observable<Vet> {
    return this.http.delete<Vet>(`${this.apiUrl}/${id}`);
  }
}
