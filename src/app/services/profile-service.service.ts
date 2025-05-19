import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  constructor( private http: HttpClient) {}

  private apiUrl = 'http://localhost:8087'; // Replace with your API URL

  getAdoptionOffers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/adoption-offers`);
  }
  getLostAndFoundPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lost-and-found`);
  }
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }
  markAsAdopted(offerId: number): Observable<any> {
  return this.http.put(`${this.apiUrl}/adoption-offers/${offerId}/adopt`, {});
}

markLostAndFoundAsFound(postId: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/lost-and-found/${postId}/mark-as-found`, {});
}

markProductAsSold(productId: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/products/${productId}/mark-as-sold`, {});
}

getUserNonProfServices(username: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/non-professional-services/filter`, {
    params: { providerUsername: username }
  });
}
deleteNonProfService(serviceId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/non-professional-services/${serviceId}`);
}
}
