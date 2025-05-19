import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../../services/profile-service.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  adoptionOffers: any[] = [];
  lostAndFoundPosts: any[] = [];
  products: any[] = [];
  currentUser: any;
  nonProfessionalServices: any[] = [];

  constructor(
    private profileService: ProfileServiceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get current user from AuthService/localStorage
    this.currentUser = this.authService.getUserFromStorage();

   this.profileService.getAdoptionOffers().subscribe(data => {
  console.log('Current user:', this.currentUser);
  console.log('Offers from API:', data);
  this.adoptionOffers = data.filter(offer => {
    console.log('Comparing', offer.user?.id, 'with', this.currentUser?.id);
    return  String(this.currentUser?.id)===String(offer.user?.id);
  });
  console.log('Filtered offers:', this.adoptionOffers);
});

    this.profileService.getLostAndFoundPosts().subscribe(data => {
      this.lostAndFoundPosts = data.filter(
        post => post.user?.id === this.currentUser?.id
      );
    });

    this.profileService.getProducts().subscribe(data => {
      this.products = data.filter(
        product => product.user?.id === this.currentUser?.id
      );
    });

     this.profileService.getUserNonProfServices(this.currentUser.username).subscribe(data => {
    this.nonProfessionalServices = data;
  });
  }
  markOfferAsAdopted(offerId: number) {
  this.profileService.markAsAdopted(offerId).subscribe(() => {
    const offer = this.adoptionOffers.find(o => o.id === offerId);
    if (offer) offer.status = 'adopted';
  });
}


markLostAndFoundAsFound(postId: number) {
  this.profileService.markLostAndFoundAsFound(postId).subscribe(() => {
    const post = this.lostAndFoundPosts.find(p => p.id === postId);
    if (post) post.status = 'found';
  });
}

markProductAsSold(productId: number) {
  this.profileService.markProductAsSold(productId).subscribe(() => {
    const product = this.products.find(p => p.id === productId);
    if (product) product.status = 'sold';
  });
}
deleteService(serviceId: number) {
  if (confirm('Are you sure you want to delete this service?')) {
    this.profileService.deleteNonProfService(serviceId).subscribe(() => {
      this.nonProfessionalServices = this.nonProfessionalServices.filter(s => s.id !== serviceId);
    });
  }
}

}