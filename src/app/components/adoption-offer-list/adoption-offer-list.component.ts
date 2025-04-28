import { Component, OnInit } from '@angular/core';
import { AdoptionOfferService } from '../../services/adoption-offer.service';
import { AdoptionOffer } from '../../modals/adoption-offer';

@Component({
  selector: 'app-adoption-offer-list',
  standalone: true,
  imports: [],
  templateUrl: './adoption-offer-list.component.html',
  styleUrl: './adoption-offer-list.component.css'
})
export class AdoptionOfferListComponent implements OnInit {
    adoptionOffers: AdoptionOffer[] = [];
  
    constructor(private adoptionOfferService: AdoptionOfferService) {}
  
    ngOnInit(): void {
      this.loadOffers();
    }
  
    loadOffers(): void {
      this.adoptionOfferService.getAllOffers().subscribe((offers) => {
        this.adoptionOffers = offers;
      });
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

}
