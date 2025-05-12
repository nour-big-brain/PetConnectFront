import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../modals/user';
import { AuthService } from '../../services/auth.service';

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
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    this.successMessage = null;
    this.errorMessage = null;

    // Send the registration request
    const newUser = {
      ...this.user,
      password: this.password
    };

    this.authService.register(newUser).subscribe({
      next: (res) => {
        this.successMessage = 'Registration successful!';
        console.log(res);
      },
      error: (err) => {
        this.errorMessage = err.error || 'Registration failed.';
        console.error(err);
      }
    });
  }
}
