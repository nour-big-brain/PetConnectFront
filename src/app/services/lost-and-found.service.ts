import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LostAndFound } from '../modals/lost-and-found';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LostAndFoundService {

  private apiUrl = '/lost-and-found';

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
}
