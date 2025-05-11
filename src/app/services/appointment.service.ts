import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../modals/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService { 
  private baseUrl = 'http://localhost:8087/appointments';

  constructor(private http: HttpClient) {}

  getAppointmentsByVet(vetId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/vet/${vetId}`);
  }

  confirmAppointment(id: number): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.baseUrl}/${id}/validate`, {});
  }

  cancelAppointment(id: number): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.baseUrl}/${id}/unvalidate`, {});
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.baseUrl, appointment);
  }
}