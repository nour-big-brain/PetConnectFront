import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LostAndFound } from '../modals/lost-and-found';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LostAndFoundService {

  private apiUrl = 'http://localhost:8087/lost-and-found';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<LostAndFound[]> {
    return this.http.get<LostAndFound[]>(`${this.apiUrl}`);
  }

  getPostById(id: number): Observable<LostAndFound> {
    return this.http.get<LostAndFound>(`${this.apiUrl}/${id}`);
  }
  createPost(post: LostAndFound): Observable<LostAndFound> {
    return this.http.post<LostAndFound>(`${this.apiUrl}`, post);
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