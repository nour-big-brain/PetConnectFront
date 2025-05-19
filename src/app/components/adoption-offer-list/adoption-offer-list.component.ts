import { Component, OnInit } from '@angular/core';
import { AdoptionOfferService } from '../../services/adoption-offer.service';
import { AdoptionOffer } from '../../modals/adoption-offer';
import { NgClass } from '@angular/common';
// Removed unused import
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-adoption-offer-list',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule,FormsModule],
  templateUrl: './adoption-offer-list.component.html',
  styleUrl: './adoption-offer-list.component.css'
})
export class AdoptionOfferListComponent implements OnInit {
  adoptionOffers: AdoptionOffer[] = [];
  viewMode: 'cards' | 'table' = 'cards';
  current_user={id:1} 
  today: string = new Date().toISOString().split('T')[0];

  // New properties for the post offer modal
  showPostModal = false;
  adoptionForm: FormGroup;
  selectedImage: string | null = null;
  filters = {
    location: '',
    titleKeyword: '',
    status: '',
    petName: '',
    minAge: null,
    maxAge: null,
    breed: '',
    sex: '',
    startDate: '',
    endDate: '',
  };

  search = {
    location: null,
    titleKeyword: '',
    status: null,
    petName: null,
    minAge: null,
    maxAge: null,
    breed: null,
    sex: null,
    startDate: null,
    endDate: null,
  };


  // Property to track which pet's details are being viewed
  openPetId: number | null = null;

  constructor(
    private adoptionOfferService: AdoptionOfferService,
    private fb: FormBuilder,
    private petService: PetService
) {
    this.adoptionForm = this.fb.group({
      title: ['', Validators.required],
      petName: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0), Validators.max(20)]],
      breed: ['', Validators.required],
      sex: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image: [null]
    });
  }

  ngOnInit(): void {
    // Static fallback offer in case backend fails
    const staticOffer: AdoptionOffer = {
      id: 1,
      location: 'Tunis',
      status: 'waiting',
      image: '', // sample image URL
      title: 'Adoption de Mimi',
      description: 'Jeune chat affectueux, cherche une famille aimante.',
      date: new Date().toISOString(),
      pet: {
        id: 101,
        name: 'Mimi',
        age: 2,
        breed: 'Siamese',
        sex: 'Femelle',
        description: 'Joueuse et calme'
      },
      user: {
        username: 'mai',
        phoneNumber: '1234566'
      },
      validated: false
    };

    // Load offers from backend
    this.loadOffers();

    // If backend call fails, use static data as fallback
    setTimeout(() => {
      if (this.adoptionOffers.length === 0) {
        console.log('No offers loaded from backend, using static data');
        this.adoptionOffers = [staticOffer];
      }
    }, 2000); // Wait 2 seconds before falling back to static data
  }
  

  applySearch():void{
    this.adoptionOfferService.filterAdoptionOffers(this.search).subscribe((filteredOffers) => {
      this.adoptionOffers = filteredOffers;
      console.log(this.adoptionOffers);

    });
  }

  loadOffers(): void {
    this.adoptionOfferService.getAllOffers().subscribe({
      next: (offers) => {
        console.log('Loaded offers:', offers);
        this.adoptionOffers = offers;
        
        // Load pet details for each offer
        this.adoptionOffers.forEach(offer => {
          if (offer.pet?.id) {
            this.petService.getPetById(offer.pet.id).subscribe({
              next: (pet) => {
                offer.pet = {
                  ...pet,
                  id: offer.pet.id
                };
              },
              error: (error) => {
                console.error(`Error loading pet details for offer ${offer.id}:`, error);
              }
            });
          }
        });
      },
    });
  }
    

  toggleView() {
    this.viewMode = this.viewMode === 'cards' ? 'table' : 'cards';
  }


  getStatusClass(status: string): string {
    switch (status) {
      case 'Available': return 'status-available';
      case 'Pending': return 'status-pending';
      case 'Adopted': return 'status-adopted';
      default: return '';
    }
  }

  applyFilters(): void {
    const filtersCopy = { ...this.filters };
  
    if (filtersCopy.startDate) {filtersCopy.startDate = this.formatDate(filtersCopy.startDate);}
    if (filtersCopy.endDate) {filtersCopy.endDate = this.formatDate(filtersCopy.endDate);}
    this.adoptionOfferService.filterAdoptionOffers(filtersCopy).subscribe((filteredOffers: AdoptionOffer[]) => {
      this.adoptionOffers = filteredOffers;
      console.log(this.adoptionOffers); 
    });
  }
  
    private formatDate(dateStr: string): string {
      const date = new Date(dateStr);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  
    resetFilters(): void {
      this.filters = {
        location: '',
        titleKeyword: '',
        status: '',
        petName: '',
        minAge: null,
        maxAge: null,
        breed: '',
        sex: '',
        startDate: '',
        endDate: '',
      };
      this.loadOffers();
    }
  

  // New methods for post offer modal
  openPostModal(): void {
    this.showPostModal = true;
  }

  closePostModal(): void {
    this.showPostModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.adoptionForm.reset();
    this.selectedImage = null;
  }

  

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  submitAdoptionOffer(): void {
    
      const formValue = this.adoptionForm.value;
      
      // First create the pet object
      const pet = {
        name: formValue.petName,
        breed: formValue.breed,
        sex: formValue.sex.toLowerCase(),
        age: Number(formValue.age),
        description: formValue.description
      };

      this.petService.addPet(pet).subscribe({
        next: (savedPet) => {
          // Create the adoption offer with the saved pet
          const adoptionOffer: AdoptionOffer = {
            title: formValue.title,
            description: formValue.description,
            date: new Date().toISOString(),
            location: formValue.location,
            status: 'waiting' as 'waiting' | 'adopted', // explicitly type the status
            validated: false,
            image: this.selectedImage ? this.extractBase64(this.selectedImage) : null,
            pet: savedPet,
            user: this.current_user
          };

          this.adoptionOfferService.createOffer(adoptionOffer).subscribe({
            next: (response) => {
              console.log('Adoption offer created:', response);
              this.closePostModal();
              this.loadOffers();
            },
            error: (error) => {
              console.error('Error creating adoption offer:', error);
            }
          });
        },
        error: (error) => {
          console.error('Error saving pet:', error);
        }
      });
    
  }

  extractBase64(dataUrl: string): string {
    return dataUrl.split(',')[1];
  }

  showPetDetails(id: number): void {
    this.openPetId = id;
    console.log(this.openPetId);
    document.body.classList.add('overflow-hidden');
  }

  closePetDetails(): void {
    this.openPetId = null;
    document.body.classList.remove('overflow-hidden');
  }
}