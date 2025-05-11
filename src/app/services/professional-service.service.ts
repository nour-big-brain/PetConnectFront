import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfessionalService } from '../modals/professional-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalServiceService {
  private apiUrl ='http://localhost:8087'

  constructor(private http:HttpClient) { }
  addProfService(profServ:ProfessionalService):Observable<ProfessionalService>{
    return this.http.post<ProfessionalService>(`${this.apiUrl}/professional-services`, profServ);
  }
  getAllProfServices():Observable<ProfessionalService[]>{
    return this.http.get<ProfessionalService[]>(`${this.apiUrl}/professional-services`);
  }
  getProfServiceById(id:number):Observable<ProfessionalService>{
    return this.http.get<ProfessionalService>(`${this.apiUrl}/professional-services/${id}`);
  }
  updateProfService(id:number, profServ:ProfessionalService):Observable<ProfessionalService>{
    return this.http.put<ProfessionalService>(`${this.apiUrl}/professional-services/${id}`, profServ);
  }
  deleteProfService(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/professional-services/${id}`);
  }
  getValidatedProfServices():Observable<ProfessionalService[]>{
    return this.http.get<ProfessionalService[]>(`${this.apiUrl}/professional-services/validated`);
  }
  getUnvalidatedProfServices():Observable<ProfessionalService[]>{
    return this.http.get<ProfessionalService[]>(`${this.apiUrl}/professional-services/non-validated`);
  }
  filterProfServices(filters: {
  name?: string;
  type?: string;
  location?: string;
  descriptionKeyword?: string;
  ownerUsername?: string;
  }): Observable<ProfessionalService[]> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value);}
    });
    return this.http.get<ProfessionalService[]>(`${this.apiUrl}/professional-services/filter`, { params });
  }
  validateProfService(id: number): Observable<ProfessionalService> {
    return this.http.put<ProfessionalService>(`${this.apiUrl}/professional-services/${id}/validate`, {});
  }
  unvalidateProfService(id: number): Observable<ProfessionalService> {
    return this.http.put<ProfessionalService>(`${this.apiUrl}/professional-services/${id}/unvalidate`, {});
  }

}
