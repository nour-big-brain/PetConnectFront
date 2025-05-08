import { Component, OnInit } from '@angular/core';
import { AdoptionOfferService } from '../../services/adoption-offer.service';
import { AdoptionOffer } from '../../modals/adoption-offer';
import { NgClass } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-adoption-offer-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './adoption-offer-list.component.html',
  styleUrl: './adoption-offer-list.component.css'
})
export class AdoptionOfferListComponent implements OnInit { adoptionOffers: AdoptionOffer[] = [];
  viewMode: 'cards' | 'table' = 'cards';

  constructor(private adoptionOfferService: AdoptionOfferService) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.adoptionOfferService.getAllOffers().subscribe((offers) => {
        console.log(offers);
        this.adoptionOffers = offers;
        // Fetch pet details based on petId
        this.adoptionOffers.forEach(offer => {
            if (offer.petId) {
                this.adoptionOfferService.getPetById(offer.petId).subscribe(pet => {
                    offer.pet = pet; // Assign fetched pet information
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
}