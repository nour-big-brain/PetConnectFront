import { Component, OnInit } from '@angular/core';
import { LostAndFound } from '../../modals/lost-and-found';
import { LostAndFoundService } from '../../services/lost-and-found.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-lost-and-found-list',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './lost-and-found-list.component.html',
  styleUrls: ['./lost-and-found-list.component.css']
})
export class LostAndFoundListComponent implements OnInit {
  lostAndFoundPosts: LostAndFound[] = [];
  filteredPosts: LostAndFound[] = [];
  showPostModal: boolean = false;
  lostForm!: FormGroup;
  openPetId: any = null;
  current_user = { id: 1 };
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

  staticPosts: LostAndFound[] = [
    {
      id: 1,
      status: 'Lost',
      pet: {
        id: 1,
        name: 'Buddy',
        breed: 'Golden Retriever',
        description: 'funny dog',
        age: 3,
        sex: 'Male',
      },
      description: 'Lost golden retriever near Central Park.',
      date: '2023-03-15',
      title: 'Lost Dog: Buddy',
      location: 'Central Park, NY',
      validated: true,
      image: 'buddy.jpg',
      user: {
        id: 1,
        username: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '123-456-7890'
      }
    },
    {
      id: 2,
      status: 'Found',
      pet: {
        id: 2,
        name: 'Whiskers',
        breed: 'Siamese',
        description: 'lovely cat',
        age: 2,
        sex: 'Female'
      },
      description: 'Found a Siamese cat near Elm Street.',
      date: '2023-03-20',
      title: 'Found Cat: Whiskers',
      location: 'Elm Street, NY',
      validated: false,
      image: 'whiskers.jpg',
      user: {
        id: 2,
        username: 'Jane Smith',
        email: 'jane.smith@example.com',
        phoneNumber: '987-654-3210'
      }
    }
  ];

  constructor(
    private lostAndFoundService: LostAndFoundService,
    private petService: PetService, // Add this
    private fb: FormBuilder
  ) { }

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
    pet: this.fb.group({
      name: [''],
      breed: [''],
      age: [null],
      sex: [''],
      description: ['']
    }),
    validated: false,
    user: {
      id: this.current_user.id,
    }
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
    document.body.classList.add('overflow-hidden');
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

    // Extract pet data from the form
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
