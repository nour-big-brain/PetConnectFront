import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdoptionOffer } from '../modals/adoption-offer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdoptionOfferService {

  private apiUrl = '/adoption-offers';

  constructor(private http: HttpClient) {}

  getAllOffers(): Observable<AdoptionOffer[]> {
    return this.http.get<AdoptionOffer[]>(this.apiUrl);
  }

  getOfferById(id: number): Observable<AdoptionOffer> {
    return this.http.get<AdoptionOffer>(`${this.apiUrl}/${id}`);
  }

  createOffer(offer: AdoptionOffer): Observable<AdoptionOffer> {
    return this.http.post<AdoptionOffer>(this.apiUrl, offer);
  }
  deleteOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

getOffersByStatus(status: string): Observable<AdoptionOffer[]> {
  return this.http.get<AdoptionOffer[]>(`${this.apiUrl}/status/${status}`);
}

getOffersByBreed(breed: string): Observable<AdoptionOffer[]> {
  return this.http.get<AdoptionOffer[]>(`${this.apiUrl}/breed/${breed}`);
}

markAsAdopted(id: number): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${id}/adopt`, {});
}

getAllAvailableOffers(): Observable<AdoptionOffer[]> {
  return this.http.get<AdoptionOffer[]>(`${this.apiUrl}/available`);
}}
