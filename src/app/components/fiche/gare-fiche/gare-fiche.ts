import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Return } from '../../button/return/return';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Gare } from '../../../models/gare';
import { GareService } from '../../../services/gare/gare-service';

@Component({
  selector: 'app-gare-fiche',
  standalone: true,
  imports: [
    CommonModule,
    Return,
    RouterModule,
  ],
  templateUrl: './gare-fiche.html',
  styleUrl: './gare-fiche.css',
})
export class GareFiche implements OnInit {

  gares: Gare[] = [];

  selectedGare = signal<Gare | undefined>(undefined);

  constructor(
    private gareService: GareService,
    private routeActivated: ActivatedRoute
  ){
    const id = this.routeActivated.snapshot.paramMap.get('id');
    if (id) {
      this.getGareById(Number(id));
    }else {
      console.error('No gare ID provided in route parameters.');
    }
  }

  ngOnInit() {
    // Logic to execute on component initialization
  }


  getGareById(id?: number) {
    this.gareService.getById(id).subscribe({
      next: (gare) => this.selectedGare.set(gare),
      error: (error) => console.error(error)
    });
  }
}

