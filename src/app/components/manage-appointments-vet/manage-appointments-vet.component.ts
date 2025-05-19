import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../modals/appointment';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({ 
  selector: 'app-manage-appointments-vet',
  standalone: true,
  imports: [DatePipe, NgClass, TitleCasePipe],
  templateUrl: './manage-appointments-vet.component.html',
  styleUrl: './manage-appointments-vet.component.css'
})
export class ManageAppointmentsVetComponent implements OnInit {
  appointments: Appointment[] = []
  currentUser: any;

  vetId: number = 1;
  // selectedDate: Date | null = null;


  constructor(private appointmentService: AppointmentService , private authService: AuthService) {}

  ngOnInit(): void {
    this.loadAppointmentsByVet();
    this.currentUser = this.authService.getUserFromStorage();
 
  }

  loadAppointmentsByVet(): void {
 this.appointmentService.getAppointments().subscribe((data: Appointment[]) => {
      this.appointments = data.filter(appointment => appointment.vetId === this.currentUser.id);
      
      console.log(this.appointments);
    });
  }

  confirm(id: number | undefined): void { if(id != undefined) this.appointmentService.confirmAppointment(id).subscribe(() => this.loadAppointmentsByVet()); 
    this.ngOnInit();
  }
  cancel(id: number | undefined): void { if(id != undefined) this.appointmentService.cancelAppointment(id).subscribe(() => this.loadAppointmentsByVet());
     this.ngOnInit();
  }
}
