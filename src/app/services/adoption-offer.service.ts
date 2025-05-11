import { Injectable } from '@angular/core';
import { AdoptionOffer } from '../modals/adoption-offer';
import { Observable } from 'rxjs';
import { Pet } from '../modals/pet';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdoptionOfferService {

  private apiUrl = 'http://localhost:8087/adoption-offers';
  private apiUrl2 = 'http://localhost:8087';

  constructor(private http: HttpClient) {}
  getPetById(id: number): Observable<Pet> {return this.http.get<Pet>(`${this.apiUrl2}/pets/${id}`);}
  getAllOffers(): Observable<AdoptionOffer[]> {return this.http.get<AdoptionOffer[]>(this.apiUrl);}
  getOfferById(id: number): Observable<AdoptionOffer> {return this.http.get<AdoptionOffer>(`${this.apiUrl}/${id}`);}
  createOffer(offer: AdoptionOffer): Observable<AdoptionOffer> {return this.http.post<AdoptionOffer>(this.apiUrl, offer);}
  deleteOffer(id: number): Observable<void> {return this.http.delete<void>(`${this.apiUrl}/${id}`);}
  markAsAdopted(id: number): Observable<void> {return this.http.put<void>(`${this.apiUrl}/${id}/adopt`, {});}
  getAllAvailableOffers(): Observable<AdoptionOffer[]> {return this.http.get<AdoptionOffer[]>(`${this.apiUrl}/available`);}

  filterAdoptionOffers(filters: {
  location?: string | null;
  titleKeyword?: string | null;
  status?: string | null;
  petName?: string | null;
  minAge?: number | null;
  maxAge?: number | null ;
  breed?: string | null;
  sex?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  }): Observable<AdoptionOffer[]> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value);}
    });
    console.log(this.http.get<AdoptionOffer[]>(`${this.apiUrl}/filter`, { params }));
    
    return this.http.get<AdoptionOffer[]>(`${this.apiUrl}/filter`, { params });
  }

    // getOffersByStatus(status: string): Observable<AdoptionOffer[]> {
  //   return this.http.get<AdoptionOffer[]>(`${this.apiUrl}/status/${status}`);
  // }

  // getOffersByBreed(breed: string): Observable<AdoptionOffer[]> {
  //   return this.http.get<AdoptionOffer[]>(`${this.apiUrl}/breed/${breed}`);
  // }

}