import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  onLogin(event: Event): void {
    event.preventDefault();
    const loginData = {
      email: this.email,
      password: this.password
    };
    console.log('Login Attempt:', loginData);
  }
}