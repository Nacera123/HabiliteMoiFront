import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Return } from '../../button/return/return';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HabilitationPostePole } from '../../../models/HabilitationPostePole';
import { LienPostePoleService } from '../../../services/lienPostePole/lien-poste-pole-service';

@Component({
  selector: 'app-lien-poste-pole-fiche',
  standalone: true,
  imports: [
    CommonModule,
    Return,
    RouterModule,
  ],
  templateUrl: './lien-poste-pole-fiche.html',
  styleUrl: './lien-poste-pole-fiche.css',
})
export class LienPostePoleFiche  implements OnInit{


  lienPostePole: HabilitationPostePole[] = [];

  selectedLien = signal<HabilitationPostePole | undefined>(undefined);

  constructor(
    private lienPostePoleService: LienPostePoleService,
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
    this.lienPostePoleService.getById(id).subscribe({
      next: (poste) => this.selectedLien.set(poste),
      error: (error) => console.error(error)
    });
  }
}

