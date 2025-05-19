import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoggedIn$: Observable<boolean> | undefined ;
    isVet$: Observable<boolean> | undefined ;
    isUser$: Observable<boolean> | undefined ;
    currentUser: any;
    constructor(private authService: AuthService, private router: Router) { }

      ngOnInit(): void {
    // Check if the user is logged in
    this.isLoggedIn$ = this.authService.isAuthenticated();
      this.currentUser = this.authService.getUserFromStorage();
    // Check if the user is a vet
     this.isVet();
     this.isUser();
  }

  isVet(): void {
      this.isVet$ = of(this.authService.getUserFromStorage()).pipe(
        map((user: any) => {
          
          // Check if the user has the role 'vet'
          console.log(user.role);
      
          return user.role === 'vet';
        })
      );
    }
  isUser(): void {
    this.isUser$ = of(this.authService.getUserFromStorage()).pipe(
      map((user: any) => {
        
        // Check if the user has the role 'user'
        console.log(user.role);
    
        return user.role === 'user';
      })
    );
  }

}
