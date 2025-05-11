import { Routes } from '@angular/router';
import { AdoptionOfferListComponent } from './components/adoption-offer-list/adoption-offer-list.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesListComponent } from './components/services-list/services-list.component';
import { LostAndFoundListComponent } from './components/lost-and-found-list/lost-and-found-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { VetListComponent } from './components/vet-list/vet-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { PetGroomingListComponent } from './components/pet-grooming-list/pet-grooming-list.component';
import { PetSittingListComponent } from './components/pet-sitting-list/pet-sitting-list.component';
import { PetTrainingListComponent } from './components/pet-training-list/pet-training-list.component';
import { PetWalkingListComponent } from './components/pet-walking-list/pet-walking-list.component';
import { AddPetGroomingComponent } from './components/add-services/add-pet-grooming/add-pet-grooming.component';
import { AddPetSittingComponent } from './components/add-services/add-pet-sitting/add-pet-sitting.component';
import { AddPetTrainingComponent } from './components/add-services/add-pet-training/add-pet-training.component';
import { AddPetWalkingComponent } from './components/add-services/add-pet-walking/add-pet-walking.component';

export const routes: Routes = [
    {path:'adoption-offers', component: AdoptionOfferListComponent},
    {path:'lostandfoundList', component: LostAndFoundListComponent},
    {path:'marketplace', component: ProductListComponent},
    {path:'signup', component: SignupComponent},
    {path:'login', component: LoginComponent},
    {path:'petGroomingList', component: PetGroomingListComponent},
    {path:'petSittingList', component: PetSittingListComponent},
    {path:'petTrainingList', component: PetTrainingListComponent},
    {path:'petWalkingList',component:PetWalkingListComponent},
    {path: 'add-pet-grooming', component: AddPetGroomingComponent},
    {path: 'add-pet-sitting', component: AddPetSittingComponent},
    {path: 'add-pet-training', component: AddPetTrainingComponent},
    {path: 'add-pet-walking', component: AddPetWalkingComponent},


    {path:'vet', component: VetListComponent},


    {path:'home', component:HomeComponent},
    {path:'servicesList',component:ServicesListComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];
