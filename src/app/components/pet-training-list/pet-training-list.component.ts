import { Component, inject, OnInit } from '@angular/core';
import { ProfessionalService } from '../../modals/professional-service';
import { ProfessionalServiceService } from '../../services/professional-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pet-training-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pet-training-list.component.html',
  styleUrl: './pet-training-list.component.css'
})
export class PetTrainingListComponent implements OnInit {
  filter={
      name: '',
      type: 'Training',
      location: '',
      descriptionKeyword: '',
      providerUsername: '',
    }
    professionalServices:ProfessionalService[] = [];
    profServiceService:ProfessionalServiceService=inject(ProfessionalServiceService);
  
    ngOnInit(): void {
      this.petTraining();
  
    }
    petTrainingProf(){
      this.profServiceService.filterProfServices(this.filter).subscribe(
        res=>{
          this.professionalServices=res;
          console.log(this.professionalServices);
        }
      )
      return this.professionalServices;
    }
    petTraining(){
      this.petTrainingProf();
    }

}
