import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Return } from '../../button/return/return';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HabilitationPole } from '../../../models/HabilitationPole';
import { LienPoleService } from '../../../services/lienPole/lien-pole-service';

@Component({
  selector: 'app-lien-pole-fiche',
  standalone: true,
  imports: [
    CommonModule,
    Return,
    RouterModule,
  ],
  templateUrl: './lien-pole-fiche.html',
  styleUrl: './lien-pole-fiche.css',
})
export class LienPoleFiche implements OnInit{


  lienPole: HabilitationPole[] = [];

  selectedLien = signal<HabilitationPole | undefined>(undefined);

  constructor(
    private lienPoleService: LienPoleService,
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
    this.lienPoleService.getById(id).subscribe({
      next: (poste) => this.selectedLien.set(poste),
      error: (error) => console.error(error)
    });
  }
}
