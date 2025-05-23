import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password!: string ;
  username!: string ; 
  errorMessage: string = ''; 

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(event: Event): void {
    event.preventDefault();
    const loginData = {
      username: this.username,
      password: this.password,
    };
    this.authService.login(loginData).subscribe({
      next: (res: any) => {
              console.log('Login request sent', loginData),

        console.log('Login successful', res);
        // Navigate to the home page or dashboard on successful login
        this.router.navigate(['/home']);
      },
      error: (err) => {
              console.log('Login request sent', loginData),

        // Handle login failure, e.g., show an error message
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Login failed', err);
      }
    });
  }
}
