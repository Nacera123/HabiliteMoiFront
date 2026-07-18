import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Return } from '../../button/return/return';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HabilitationPosteDirection } from '../../../models/HabilitationPosteDirection';
import { LienPosteDirectionService } from '../../../services/lienPosteDirection/lien-poste-direction-service';

@Component({
  selector: 'app-lien-poste-direction-fiche',
  standalone: true,
  imports: [
    CommonModule,
    Return,
    RouterModule,
  ],
  templateUrl: './lien-poste-direction-fiche.html',
  styleUrl: './lien-poste-direction-fiche.css',
})
export class LienPosteDirectionFiche implements OnInit{


  lienPosteDirection: HabilitationPosteDirection[] = [];

  selectedLien = signal<HabilitationPosteDirection | undefined>(undefined);

  constructor(
    private lienPosteDirectionService: LienPosteDirectionService,
    private routeActivated: ActivatedRoute
  ){
    const id = this.routeActivated.snapshot.paramMap.get('id');
    if (id) {
      this.getPostebyId(Number(id));
    }else {
      console.error('No employe ID provided in route parameters.');
    }
  }

  ngOnInit() {
    // Logic to execute on component initialization
  }


  getPostebyId(id?: number) {
    this.lienPosteDirectionService.getById(id).subscribe({
      next: (poste) => this.selectedLien.set(poste),
      error: (error) => console.error(error)
    });
  }
}

