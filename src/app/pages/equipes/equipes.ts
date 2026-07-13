import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { Equipe } from '../../models/equipe';
import { EquipeService } from '../../services/equipe/equipe-service';
import { Direction } from '../../models/direction';
import { Pole } from '../../models/pole';
import { Poste } from '../../models/poste';
import { DirectionService } from '../../services/direction/direction-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-equipes',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
  ],
  templateUrl: './equipes.html',
  styleUrl: './equipes.css',
})
export class Equipes implements  OnInit{

  equipes = signal<Equipe[]>([]);
  directions = signal<Direction[]>([]);
  poles = signal<Pole[]>([]);
  postes = signal<Poste[]>([]);


  posteSelectionne?: Poste;
  EquipeSelectionne?: Equipe;
  errormsg?: string;
  searchTerm = '';




  constructor(
    private equipeService: EquipeService,
  ) {}

  ngOnInit(): void {
    this.getEquipe();

  }

  getEquipe() {
    this.equipeService.getAll().subscribe({
      next: (response) => {

        this.directions.set(response.directions);
        this.poles.set(response.poles)
        this.postes.set(response.postes)


        console.log('REPONSE API : ', response);


        console.log('directions : ', this.directions);
        console.log('poles : ', this.poles);
        console.log('postes : ', this.postes);

      },
      error: (error) => {
        console.error(error);
        this.errormsg = error;
      }
    });
  }


  removeMembre(id: number): void {

    this.equipeService.deleteMembre(id).subscribe({

      next: () => {

        // Recharge la liste des directions, pôles et postes
        this.getEquipe();

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

}