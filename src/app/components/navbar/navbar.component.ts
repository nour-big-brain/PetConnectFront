import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn$: Observable<boolean> | undefined ;
  isVet$: Observable<boolean> | undefined ;
  isUser$: Observable<boolean> | undefined ;
 
  constructor(private authService: AuthService, private router: Router) { }

   ngOnInit(): void {
    // Check if the user is logged in
    this.isLoggedIn$ = this.authService.isAuthenticated();
    // Check if the user is a vet
     this.isVet();
     this.isUser();
     

  }
    onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page after logout
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
        
        // Check if the user has the role 'vet'
        console.log(user.role);
    
        return user.role === 'user';
      })
    );
  }

}
