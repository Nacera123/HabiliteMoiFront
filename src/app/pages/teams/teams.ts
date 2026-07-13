import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Gare } from '../../models/gare';
import { GareService } from '../../services/gare/gare-service';
import { Equipe } from '../../models/equipe';
import { Direction } from '../../models/direction';
import { Pole } from '../../models/pole';
import { Poste } from '../../models/poste';
import { EquipeService } from '../../services/equipe/equipe-service';
import { DirectionService } from '../../services/direction/direction-service';
import { TeamService } from '../../services/teamService';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teams.html',
  styleUrl: './teams.css',
})
export class Teams implements  OnInit{

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




}