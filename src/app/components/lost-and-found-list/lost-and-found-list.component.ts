import { Component, OnInit } from '@angular/core';
import { LostAndFound } from '../../modals/lost-and-found';
import { LostAndFoundService } from '../../services/lost-and-found.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lost-and-found-list',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './lost-and-found-list.component.html',
  styleUrl: './lost-and-found-list.component.css'
})
export class LostAndFoundListComponent implements OnInit {
  lostAndFoundPosts: LostAndFound[] = [];
  filteredPosts: LostAndFound[] = [];
  showPostModal: boolean = false;
  lostForm!: FormGroup;

  filters = {
    title: '',
    date: '',
    location: ''
  };

  constructor(
    private lostAndFoundService: LostAndFoundService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadPosts();
  }

  initForm(): void {
    this.lostForm = this.fb.group({
      title: [''],
      status: ['Lost'],
      date: [''],
      location: [''],
      description: [''],
      image: [''],
      petId: [null]
    });
  }

  loadPosts(): void {
    this.lostAndFoundService.getAllPosts().subscribe((posts) => {
      this.lostAndFoundPosts = posts;
      this.filteredPosts = posts;
    });
  }

  applyFilters(): void {
    this.filteredPosts = this.lostAndFoundPosts.filter(post => {
      return (
        (!this.filters.title || post.title.toLowerCase().includes(this.filters.title.toLowerCase())) &&
        (!this.filters.date || post.date === this.filters.date) &&
        (!this.filters.location || post.location.toLowerCase().includes(this.filters.location.toLowerCase()))
      );
    });
  }

  resetFilters(): void {
    this.filters = { title: '', date: '', location: '' };
    this.filteredPosts = [...this.lostAndFoundPosts];
  }

  openPostModal(): void {
    this.showPostModal = true;
  }

  closePostModal(): void {
    this.showPostModal = false;
    this.lostForm.reset({ status: 'Lost' });
  }

  submitLostReport(): void {
    const newPost = this.lostForm.value;
    this.lostAndFoundService.createPost(newPost).subscribe(() => {
      this.closePostModal();
      this.loadPosts();
    });
  }

  onLostFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        this.lostForm.patchValue({ image: (reader.result as string).split(',')[1] });
      };
      reader.readAsDataURL(input.files[0]);
    }
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
