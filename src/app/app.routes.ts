import { Routes } from '@angular/router';
import { AdoptionOfferListComponent } from './components/adoption-offer-list/adoption-offer-list.component';

export const routes: Routes = [
    {path:'adoption-offers', component: AdoptionOfferListComponent},
    {path: '', redirectTo: '/adoption-offers', pathMatch: 'full'},
];
