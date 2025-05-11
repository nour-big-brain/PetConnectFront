import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../modals/user';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User = {
    username: '',
    email: '',
    phoneNumber: ''
  };

  password: string = '';
  lastName: string = '';

  onSubmit(event: Event): void {
    event.preventDefault();
    const newUser = {
      ...this.user,
      lastName: this.lastName,
      password: this.password
    };
    console.log('User Registered:', newUser);
  }
}