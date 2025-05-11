import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../modals/appointment';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';


@Component({ 
  selector: 'app-manage-appointments-vet',
  standalone: true,
  imports: [DatePipe, NgClass, TitleCasePipe],
  templateUrl: './manage-appointments-vet.component.html',
  styleUrl: './manage-appointments-vet.component.css'
})
export class ManageAppointmentsVetComponent implements OnInit {
  appointments: Appointment[] = []

  vetId: number = 1; 
  // selectedDate: Date | null = null;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAppointmentsByVet(this.vetId).subscribe(
      data => this.appointments = data,
      error => console.error(error));
  }

  confirm(id: number | undefined): void { if(id != undefined) this.appointmentService.confirmAppointment(id).subscribe(() => this.loadAppointments());}
  cancel(id: number | undefined): void { if(id != undefined) this.appointmentService.cancelAppointment(id).subscribe(() => this.loadAppointments());}
}
