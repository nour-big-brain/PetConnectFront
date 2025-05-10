import { Component, OnInit } from '@angular/core';
import { AdoptionOfferService } from '../../services/adoption-offer.service';
import { AdoptionOffer } from '../../modals/adoption-offer';
import { NgClass } from '@angular/common';
import { of } from 'rxjs';
import { FormBuilder,  FormGroup,  FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-adoption-offer-list',
  standalone: true,
  imports: [NgClass,ReactiveFormsModule],
  templateUrl: './adoption-offer-list.component.html',
  styleUrl: './adoption-offer-list.component.css'
})
export class AdoptionOfferListComponent implements OnInit { 
  adoptionOffers: AdoptionOffer[] = [];
  viewMode: 'cards' | 'table' = 'cards';
  
  // New properties for the post offer modal
  showPostModal = false;
  adoptionForm: FormGroup;
  selectedImage: string | null = null;
  
  constructor(
    private adoptionOfferService: AdoptionOfferService,
    private fb: FormBuilder,
    private petService :PetService
  ) {
    // Initialize form
    this.adoptionForm = this.fb.group({
      petName: ['', Validators.required],
      petType: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0), Validators.max(20)]],
      breed: ['', Validators.required],
      sex: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.adoptionOfferService.getAllOffers().subscribe((offers) => {
      console.log(offers);
      this.adoptionOffers = offers;
      this.adoptionOffers.forEach(offer => {
        if (offer.petId) {
          this.adoptionOfferService.getPetById(offer.petId).subscribe(pet => {
            offer.pet = pet;
          });
        }
      });
    });
  }

  toggleView() {
    this.viewMode = this.viewMode === 'cards' ? 'table' : 'cards';
  }

  markAsAdopted(id: number): void {
    this.adoptionOfferService.markAsAdopted(id).subscribe(() => {
      this.loadOffers();
    });
  }

  deleteOffer(id: number): void {
    this.adoptionOfferService.deleteOffer(id).subscribe(() => {
      this.loadOffers();
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Available': return 'status-available';
      case 'Pending': return 'status-pending';
      case 'Adopted': return 'status-adopted';
      default: return '';
    }
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
    if (this.adoptionForm.valid) {
      const formValue = this.adoptionForm.value;
      
      // Create pet object first
      this.petService.addPet({
        name: formValue.petName,
        breed: formValue.breed,
        sex: formValue.sex,
        age: formValue.age,
        description: formValue.description
      }).subscribe(pet => {
        
        const newOffer = {
          petId: pet.id,
          location: formValue.location,
          status: 'Available',
          image: this.selectedImage ? this.extractBase64(this.selectedImage) : null,
          title: `Adoption de ${formValue.petName}`,
          description: formValue.description,
          date: new Date().toISOString()
        };
        
        
        this.adoptionOfferService.createOffer(newOffer as AdoptionOffer).subscribe(() => {
          this.closePostModal();
          this.loadOffers(); // Refresh the list
        });
      });
    } 
  }
  
  // Helper to extract base64 data from data URL
  private extractBase64(dataUrl: string): string {
    return dataUrl.split(',')[1];
  }
}