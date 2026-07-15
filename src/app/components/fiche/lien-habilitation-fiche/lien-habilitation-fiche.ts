import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Return } from '../../button/return/return';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Lienhabilitation } from '../../../models/lienhabilitation';
import { LienhabilitationService } from '../../../services/lienHabilitation/lienhabilitation-service';

@Component({
  selector: 'app-lien-habilitation-fiche',
  standalone: true,
  imports: [
    CommonModule,
    Return,
    RouterModule,
  ],
  templateUrl: './lien-habilitation-fiche.html',
  styleUrl: './lien-habilitation-fiche.css',
})
export class LienHabilitationFiche implements OnInit{


  lien: Lienhabilitation[] = [];

  selectedLien = signal<Lienhabilitation | undefined>(undefined);

  constructor(
    private lienService: LienhabilitationService,
    private routeActivated: ActivatedRoute
  ){
    const id = this.routeActivated.snapshot.paramMap.get('id');
    if (id) {
      this.getLienById(Number(id));
    }else {
      console.error('No employe ID provided in route parameters.');
    }
  }

  ngOnInit() {
    // Logic to execute on component initialization
  }


  getLienById(id?: number) {
    this.lienService.getById(id).subscribe({
      next: (lien) => this.selectedLien.set(lien),
      error: (error) => console.error(error)
    });
  }
}
