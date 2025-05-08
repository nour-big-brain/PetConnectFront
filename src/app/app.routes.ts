import { Routes } from '@angular/router';
import { AdoptionOfferListComponent } from './components/adoption-offer-list/adoption-offer-list.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesListComponent } from './components/services-list/services-list.component';

export const routes: Routes = [
    {path:'adoption-offers', component: AdoptionOfferListComponent},
    {path:'home', component:HomeComponent},
    {path:'servicesList',component:ServicesListComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];
