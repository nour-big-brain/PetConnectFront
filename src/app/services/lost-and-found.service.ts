import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LostAndFound } from '../modals/lost-and-found';

@Injectable({
  providedIn: 'root'
})
export class LostAndFoundService {
  private apiUrl = 'http://localhost:8087/lost-and-found';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  createPost(post: Partial<LostAndFound>): Observable<LostAndFound> {
    const headers = this.getHeaders();
    
    // Ensure proper date formatting and data structure
    const formattedPost = {
      title: post.title,
      description: post.description,
      location: post.location,
      status: post.status?.toLowerCase(),
      date: new Date().toISOString(),
      validated: false,
      image: post.image,
      user: post.user,
      pet: post.pet ? {
        name: post.pet.name,
        age: Number(post.pet.age),
        breed: post.pet.breed,
        sex: post.pet.sex?.toLowerCase(),
        description: post.pet.description
      } : null
    };

    console.log('Sending formatted post:', formattedPost);

    return this.http.post<LostAndFound>(this.apiUrl, formattedPost, { headers }).pipe(
      tap(response => console.log('Server response:', response)),
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => new Error(error.error?.message || 'Failed to create post'));
      })
    );
  }

  getAllPosts(): Observable<LostAndFound[]> {
    return this.http.get<LostAndFound[]>(`${this.apiUrl}`);
  }

  getPostById(id: number): Observable<LostAndFound> {
    return this.http.get<LostAndFound>(`${this.apiUrl}/${id}`);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPostsByStatus(status: string): Observable<LostAndFound[]> {
    return this.http.get<LostAndFound[]>(`${this.apiUrl}/status/${status}`);
  }

  getPostsByLocation(location: string): Observable<LostAndFound[]> {
    return this.http.get<LostAndFound[]>(`${this.apiUrl}/location/${location}`);
  }

  getPostsByPetName(name: string): Observable<LostAndFound[]> {
    return this.http.get<LostAndFound[]>(`${this.apiUrl}/pet-name/${name}`);
  }

  markAsFound(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/found`, {});
  }

  filterLostAndFound(filter: {
      location?: string | null;
      titleKeyword?: string | null;
      status?: string | null;
      startDate?: string | null;
      endDate?: string | null;
      petName?: string | null;
      breed?: string | null;
      sex?: string | null;
      minAge?: number | null;
      maxAge?: number | null;
  }): Observable<LostAndFound[]> {
    let params = new HttpParams();

    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.append(key, value.toString());
      }
    });
console.log(`${this.apiUrl}/filter`, { params });

    return this.http.get<LostAndFound[]>(`${this.apiUrl}/filter`, { params });
  }
}