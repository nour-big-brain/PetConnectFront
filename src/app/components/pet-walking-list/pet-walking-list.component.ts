import { Component, inject, OnInit } from '@angular/core';
import { NonProfessionalService } from '../../modals/non-professional-service';
import { NonProfessionalServiceService } from '../../services/non-professional-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pet-walking-list',
  standalone: true,
  imports: [RouterLink  ],
  templateUrl: './pet-walking-list.component.html',
  styleUrl: './pet-walking-list.component.css'
})
export class PetWalkingListComponent implements OnInit {
  filter={
        name: '',
        type: 'Walking',
        location: '',
        descriptionKeyword: '',
        providerUsername: '',
      }
      NonprofessionalServices:NonProfessionalService[] = [];
      NonprofServiceService:NonProfessionalServiceService=inject(NonProfessionalServiceService);
    
      ngOnInit(): void {
        this.petWalkinging();
    
      }
      petWalkingProf(){
        this.NonprofServiceService.filterNonProfServices(this.filter).subscribe(
          res=>{
            this.NonprofessionalServices=res;
            console.log(this.NonprofessionalServices);
          }
        )
        return this.NonprofessionalServices;
      }
      petWalkinging(){
        this.petWalkingProf();
      }

}
