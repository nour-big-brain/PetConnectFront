import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../modals/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8087';
  private tokenKey = 'authToken';
  private userKey = 'authUser';

  private currentUserSubject = new BehaviorSubject<any>(this.getUserFromStorage());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ----------- REGISTER -----------
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, user).pipe(
      tap((res: any) => {
        console.log('Register API Response:', res); // Inspect the response
        this.saveAuthData(res.token, res.user);
      })
    );
  }

  // ----------- LOGIN -----------
  login(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, user).pipe(
      tap((res: any) => {
        console.log('Login API Response:', res); // Inspect the response
        this.saveAuthData(res.token, res.user);
      })
    );
  }

  // ----------- LOGOUT -----------
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }

  // ----------- GET PROFILE -----------
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile/user`, {
      headers: this.getAuthHeaders(),
    });
  }

  // ----------- CHANGE PASSWORD -----------
  changePassword(data: { currentPwd: string; newPwd: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/profile/password`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  // ----------- CHANGE USERNAME -----------
  changeUsername(data: { currentPwd: string; newUsername: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/profile/username`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  // ----------- HELPERS -----------

  private saveAuthData(token: string, user: any) {
    console.log('Saving to local storage:', user); // Log the user object before saving
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserFromStorage() {
    const userString = localStorage.getItem(this.userKey); // Get the string from local storage
    if (userString) {
      const user = JSON.parse(userString);
      console.log('Retrieved from local storage:', user); // Log the user object after retrieval
      return user;
    }
    return null;
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
  }
}