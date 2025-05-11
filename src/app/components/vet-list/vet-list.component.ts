import { Component, OnInit } from '@angular/core';
import { VetService, Vet } from '../../services/vet.service'; 
import { AppointmentService } from '../../services/appointment.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../modals/user';

@Component({
  selector: 'app-vet-list',
  templateUrl: './vet-list.component.html',
  imports: [FormsModule],
  standalone: true,
  styleUrls: ['./vet-list.component.css']
})
export class VetListComponent implements OnInit {
  vets: Vet[] = [];
  loading = true;
  error = false;
  userOne!: User;

  showAppointmentForm = false;
  selectedVet: Vet | null = null;
  appointment = {
    date: '',
    description: '',
    user: {
      username: '',
      email: '',
      phoneNumber: ''
    } as User
  };

  staticVet: Vet = {
    id: 999,
    username: 'StaticVet',
    email: 'staticvet@example.com',
    password: 'password123',
    profilePicture: '',
    phoneNumber: '123-456-7890',
    address: '123 Static Street, Vet City, VC 12345',
    posts: [],
    appointments: [],
    nonProfessionalServices: []
  };

  constructor(private vetService: VetService, private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadVets();
  }

  loadVets(): void {
    this.loading = true;
    this.error = false;

    this.vetService.getAllVets().subscribe({
      next: (offers) => {
        this.vets = [this.staticVet, ...offers];
        this.loading = false;
      },
      error: () => {
        this.vets = [this.staticVet];
        this.error = false;
        this.loading = false;
      }
    });
  }

  openAppointmentForm(vet: Vet): void {
    this.selectedVet = vet;
    this.showAppointmentForm = true;
  }

  closeAppointmentForm(): void {
    this.showAppointmentForm = false;
    this.appointment = {
      date: '',
      description: '',
      user: {
        username: '',
        email: '',
        phoneNumber: ''
      }
    };
  }

  submitAppointment(event: Event): void {
    event.preventDefault();
    if (this.selectedVet) {
      const newAppointment = {
        date: this.appointment.date,
        description: this.appointment.description,
        vetId: this.selectedVet.id,
        user: {
          username: this.appointment.user.username,
          email: this.appointment.user.email,
          phoneNumber: this.appointment.user.phoneNumber
        },
        status_appointment: 'pending', 
        vet: this.selectedVet 
      };

      this.appointmentService.createAppointment(newAppointment).subscribe({
        next: (response) => {
          console.log('Appointment Created:', response);
          this.closeAppointmentForm();
        },
        error: (err) => {
          console.error('Error creating appointment:', err);
        }
      });
    }
  }
}