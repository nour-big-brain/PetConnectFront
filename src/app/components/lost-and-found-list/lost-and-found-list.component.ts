import { Component, OnInit } from '@angular/core';
import { LostAndFound } from '../../modals/lost-and-found';
import { LostAndFoundService } from '../../services/lost-and-found.service';

@Component({
  selector: 'app-lost-and-found-list',
  standalone: true,
  imports: [],
  templateUrl: './lost-and-found-list.component.html',
  styleUrl: './lost-and-found-list.component.css'
})
export class LostAndFoundListComponent implements OnInit {
  lostAndFoundPosts: LostAndFound[] = [];

  constructor(private lostAndFoundService: LostAndFoundService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.lostAndFoundService.getAllPosts().subscribe((posts) => {
      this.lostAndFoundPosts = posts;
    });
  }

  markAsFound(id: number): void {
    this.lostAndFoundService.markAsFound(id).subscribe(() => {
      this.loadPosts();
    });
  }
  
  deletePost(id: number): void {
    this.lostAndFoundService.deletePost(id).subscribe(() => {
      this.loadPosts();
    });
  }

}
