import { Component, inject, OnInit } from '@angular/core';
import { Service } from '../../modals/service';
import { ProfessionalService } from '../../modals/professional-service';
import { NonProfessionalService } from '../../modals/non-professional-service';
import { ProfessionalServiceService } from '../../services/professional-service.service';
import { NonProfessionalServiceService } from '../../services/non-professional-service.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pet-grooming-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pet-grooming-list.component.html',
  styleUrl: './pet-grooming-list.component.css',
})
export class PetGroomingListComponent implements OnInit {
  filter={
    name: '',
    type: 'Grooming',
    location: '',
    descriptionKeyword: '',
    providerUsername: '',
  }
  professionalServices:ProfessionalService[] = [];
  profServiceService:ProfessionalServiceService=inject(ProfessionalServiceService);

  ngOnInit(): void {
    this.petGrooming();

  }
  petGroomingProf(){
    this.profServiceService.filterProfServices(this.filter).subscribe(
      res=>{
        this.professionalServices=res;
        console.log(this.professionalServices);
      }
    )
    return this.professionalServices;
  }
  petGrooming(){
    this.petGroomingProf();
  }
}
