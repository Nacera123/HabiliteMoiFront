import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Return } from '../../button/return/return';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Pole } from '../../../models/pole';
import { PoleService } from '../../../services/pole/pole-service';

@Component({
  selector: 'app-pole-fiche',
  standalone: true,
  imports: [
    CommonModule,
    Return,
    RouterModule,
  ],
  templateUrl: './pole-fiche.html',
  styleUrl: './pole-fiche.css',
})
export class PoleFiche implements OnInit{


  poles: Pole[] = [];

  selectedPole = signal<Pole | undefined>(undefined);

  constructor(
    private poleService: PoleService,
    private routeActivated: ActivatedRoute
  ){
    const id = this.routeActivated.snapshot.paramMap.get('id');
    if (id) {
      this.getPolebyId(Number(id));
    }else {
      console.error('No employe ID provided in route parameters.');
    }
  }

  ngOnInit() {
    // Logic to execute on component initialization
  }


  getPolebyId(id?: number) {
    this.poleService.getById(id).subscribe({
      next: (pole) => this.selectedPole.set(pole),
      error: (error) => console.error(error)
    });
  }
}

