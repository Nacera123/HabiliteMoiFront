import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Poste } from '../../../models/poste';
import { EquipeService } from '../../../services/equipe/equipe-service';
import { EquipeRequest } from '../../../models/EquipeRequest';

@Component({
  selector: 'app-equipe-form',
  standalone: true,
  imports: [    CommonModule,
    FormsModule,
    RouterModule],
  templateUrl: './equipe-form.html',
  styleUrl: './equipe-form.css',
})
export class EquipeForm implements OnInit {


  poste!: Poste;

  posteId!: number;


  // Membres déjà dans l'équipe
  membresActuels: Poste[] = [];


  // Membres que l'on peut ajouter
  membresDisponibles: Poste[] = [];


  membreSelectionne!: number;


  errorMessage = '';



  constructor(
    private route: ActivatedRoute,
    private equipeService: EquipeService,
    private cdr: ChangeDetectorRef
  ) {}



  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.posteId = Number(params['id']);

      this.loadData();

    });

  }




  loadData(): void {


    this.equipeService.getUpdateData1(this.posteId)
      .subscribe({

        next: (data: any) => {


          console.log("DATA UPDATE :", data);



          // Le poste sélectionné (futur responsable)
          this.poste = data.poste;



          // Les membres déjà liés à ce responsable
          this.membresActuels = data.membresActuels ?? [];



          // Les collègues disponibles pour rejoindre l'équipe
          this.membresDisponibles = data.membresDisponibles ?? [];




          console.log("POSTE :", this.poste);


          console.log(
            "MEMBRES ACTUELS :",
            this.membresActuels
          );


          console.log(
            "MEMBRES DISPONIBLES :",
            this.membresDisponibles
          );



          this.cdr.detectChanges();


        },


        error: (err) => {


          console.error(err);


          this.errorMessage = "Erreur récupération données équipe";


        }


      });


  }





  ajouterMembre(): void {


    if (!this.membreSelectionne) {
      return;
    }



    this.equipeService.update2(
      this.posteId,
      [
        this.membreSelectionne
      ]
    )
    .subscribe({


      next: (data) => {

        console.log("Réponse ajout :", data);

        this.membreSelectionne = 0;

        setTimeout(() => {
          this.loadData();
        }, 200);

      },


      error: (err) => {


        console.error(err);


        this.errorMessage = err.error;


      }


    });



  }



  removeMembre(id: number): void {
    this.equipeService.deleteMembre(id).subscribe({
      next: () => {
        this.loadData();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error;
      }
    });
  }




}