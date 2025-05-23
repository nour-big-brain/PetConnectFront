import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from '../modals/product';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8087/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Product>(`${this.apiUrl}`, product, { headers }).pipe(
      tap(response => console.log('Create product response:', response)),
      catchError(error => {
        console.error('Create product error:', error);
        return throwError(() => error);
      })
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
  filterProducts(filters: {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    titleKeyword?: string;
    status?: string; 
    startDate?: string; 
    endDate?: string;   
  }): Observable<Product[]> {
    let params = new HttpParams();

    if (filters.location) params = params.set('location', filters.location);
    if (filters.minPrice !== undefined) params = params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== undefined) params = params.set('maxPrice', filters.maxPrice.toString());
    if (filters.titleKeyword) params = params.set('titleKeyword', filters.titleKeyword);
    if (filters.status) params = params.set('status', filters.status);
    if (filters.startDate) params = params.set('startDate', filters.startDate);
    if (filters.endDate) params = params.set('endDate', filters.endDate);

    return this.http.get<Product[]>(`${this.apiUrl}/filter`, { params });
  }
}
