import { Component, OnInit } from '@angular/core';
import { LostAndFound } from '../../modals/lost-and-found';
import { LostAndFoundService } from '../../services/lost-and-found.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { PetService } from '../../services/pet.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../modals/user';

@Component({
  selector: 'app-lost-and-found-list',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,DatePipe],
  templateUrl: './lost-and-found-list.component.html',
  styleUrls: ['./lost-and-found-list.component.css']
})
export class LostAndFoundListComponent implements OnInit {
  lostAndFoundPosts: LostAndFound[] = [];
  filteredPosts: LostAndFound[] = [];
  showPostModal: boolean = false;
  lostForm!: FormGroup;
  openPetId: any = null;

  current_user !: User;
  today: string = new Date().toISOString().split('T')[0];

  filters = {
    location: '',
    titleKeyword: '',
    status: '',
    petName: '',
    breed: '',
    sex: '',
    minAge: null,
    maxAge: null,
    startDate: '',
    endDate: ''
  };

  search = {
    location: '',
    titleKeyword: '',
    status: '',
    petName: '',
    breed: '',
    sex: '',
    minAge: null,
    maxAge: null,
    startDate: '',
    endDate: ''
  };

  staticPosts: LostAndFound[] = [];

  constructor(

    private lostAndFoundService: LostAndFoundService,
    private petService: PetService, 
    private authService: AuthService,
    private fb: FormBuilder
  ) { }
   
  ngOnInit(): void {
    console.log("Component initialized");
    this.loadCurrentUser();
    this.initForm();
    this.loadPosts();
  }
  loadCurrentUser(): void {
    this.current_user = this.authService.getUserFromStorage(); 
    console.log('Current user:', this.current_user);
    
  }

  initForm(): void {
  this.lostForm = this.fb.group({
    title: [''],
    status: ['Lost'],
    date: [''],
    location: [''],
    description: [''],
    image: [''],
    pet: this.fb.group({
      name: [''],
      breed: [''],
      age: [null],
      sex: [''],
      description: ['']
    }),
    validated: false,
    user:this.current_user,
  });
}


  loadPosts(): void {
    this.lostAndFoundService.getAllPosts().subscribe(posts => {
      this.lostAndFoundPosts = posts;
      this.lostAndFoundPosts.push(...this.staticPosts);
    });
  }

  applySearch(): void {
    this.lostAndFoundService.filterLostAndFound(this.search).subscribe(filtered => {
      this.lostAndFoundPosts = filtered;
      console.log(this.lostAndFoundPosts);
    });
  }

  applyFilters(): void {
    const query = { ...this.filters };

    if (query.startDate) query.startDate = this.formatDate(query.startDate);
    if (query.endDate) query.endDate = this.formatDate(query.endDate);

    this.lostAndFoundService.filterLostAndFound(query).subscribe(filtered => {
      this.lostAndFoundPosts = filtered;
      console.log(this.lostAndFoundPosts);

    });
  }

  resetFilters(): void {
    this.filters = {
      location: '',
      titleKeyword: '',
      status: 'lost',
      petName: '',
      breed: '',
      sex: '',
      minAge: null,
      maxAge: null,
      startDate: '',
      endDate: ''
    };
    this.loadPosts();
  }
  showPetDetails(id: number): void {
  this.openPetId = this.lostAndFoundPosts.find(p => p.id === id);

  if (this.openPetId) {
    // Get the current user from local storage
    this.loadCurrentUser();
    
    // Merge the current user into the openPetId object
    this.openPetId = { ...this.openPetId, user: this.current_user };
    console.log('Updated openPetId:', this.openPetId);
    document.body.classList.add('overflow-hidden');
  }
}
  closePetDetails(): void {
    console.log('Closing pet details');
    this.openPetId = null;
    document.body.classList.remove('overflow-hidden');
  }
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }




  openPostModal(): void {
    this.showPostModal = true;
  }

  closePostModal(): void {
    this.showPostModal = false;
    this.lostForm.reset({ status: 'Lost' });
  }
  submitLostReport(): void {
    const formValue = this.lostForm.value;

    const petData = formValue.pet;

    this.petService.addPet(petData).subscribe({
      next: (createdPet) => {
        const newPost = {
          ...formValue,
          pet: createdPet 
        };

        this.lostAndFoundService.createPost(newPost).subscribe(() => {
          this.closePostModal();
          this.loadPosts();
        });
      },
      error: (err) => {
        console.error('Error creating pet:', err);
      }
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
