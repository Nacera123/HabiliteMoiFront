import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Return } from '../../button/return/return';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HabilitationDirection } from '../../../models/HabilitationDirection';
import { LienDirectionService } from '../../../services/lienDirection/lien-direction-service';

@Component({
  selector: 'app-lien-direction-fiche',
  standalone: true,
  imports: [
    CommonModule,
    Return,
    RouterModule,
  ],
  templateUrl: './lien-direction-fiche.html',
  styleUrl: './lien-direction-fiche.css',
})
export class LienDirectionFiche implements OnInit{


  lienDirection: HabilitationDirection[] = [];

  selectedLien = signal<HabilitationDirection | undefined>(undefined);

  constructor(
    private lienDirectionService: LienDirectionService,
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
    this.lienDirectionService.getById(id).subscribe({
      next: (poste) => this.selectedLien.set(poste),
      error: (error) => console.error(error)
    });
  }
}



