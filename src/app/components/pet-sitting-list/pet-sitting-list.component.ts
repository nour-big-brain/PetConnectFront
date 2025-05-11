import { Component, inject, OnInit } from '@angular/core';
import { ProfessionalService } from '../../modals/professional-service';
import { ProfessionalServiceService } from '../../services/professional-service.service';
import { NonProfessionalService } from '../../modals/non-professional-service';
import { NonProfessionalServiceService } from '../../services/non-professional-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pet-sitting-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pet-sitting-list.component.html',
  styleUrl: './pet-sitting-list.component.css'
})
export class PetSittingListComponent implements OnInit {
  filter={
      name: '',
      type: 'Sitting',
      location: '',
      descriptionKeyword: '',
      providerUsername: '',
    }
    NonprofessionalServices:NonProfessionalService[] = [];
    NonprofServiceService:NonProfessionalServiceService=inject(NonProfessionalServiceService);
  
    ngOnInit(): void {
      this.petSittinging();
  
    }
    petSittingProf(){
      this.NonprofServiceService.filterNonProfServices(this.filter).subscribe(
        res=>{
          this.NonprofessionalServices=res;
          console.log(this.NonprofessionalServices);
        }
      )
      return this.NonprofessionalServices;
    }
    petSittinging(){
      this.petSittingProf();
    }

}
