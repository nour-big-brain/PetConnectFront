import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NonProfessionalService } from '../modals/non-professional-service';

@Injectable({
  providedIn: 'root'
})
export class NonProfessionalServiceService {
  private apiUrl ='http://localhost:8087'

  constructor(private http:HttpClient) { }
  addNonProfService(nonProfServ:any):Observable<NonProfessionalService>{
    return this.http.post<NonProfessionalService>(`${this.apiUrl}/non-professional-services`, nonProfServ);
  }
  getNonProfServiceById(id:number):Observable<NonProfessionalService>{
    return this.http.get<NonProfessionalService>(`${this.apiUrl}/non-professional-services/${id}`);
  }
  getAllNonProfServices():Observable<NonProfessionalService[]>{
    return this.http.get<NonProfessionalService[]>(`${this.apiUrl}/non-professional-services`);
  }
  updateNonProfService(id:number, nonProfServ:NonProfessionalService):Observable<NonProfessionalService>{
    return this.http.put<NonProfessionalService>(`${this.apiUrl}/non-professional-services/${id}`, nonProfServ);
  }
  deleteNonProfService(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/non-professional-services/${id}`);
  }
  getValidatedNonProfServices():Observable<NonProfessionalService[]>{
    return this.http.get<NonProfessionalService[]>(`${this.apiUrl}/non-professional-services/validated`);
  }
  getUnvalidatedNonProfServices():Observable<NonProfessionalService[]>{
    return this.http.get<NonProfessionalService[]>(`${this.apiUrl}/non-professional-services/non-validated`);
  }
  validateNonProfService(id: number): Observable<NonProfessionalService> {
    return this.http.put<NonProfessionalService>(`${this.apiUrl}/non-professional-services/${id}/validate`, {});
  }
  unvalidateNonProfService(id: number): Observable<NonProfessionalService> {
    return this.http.put<NonProfessionalService>(`${this.apiUrl}/non-professional-services/${id}/unvalidate`, {});
  }
  filterNonProfServices(filters: {
    name?: string;
    type?: string;
    location?: string;
    descriptionKeyword?: string;
    providerUsername?: string;
  }): Observable<NonProfessionalService[]> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value);
      }
    });
    return this.http.get<NonProfessionalService[]>(`${this.apiUrl}/non-professional-services/filter`, { params });
  }
}
