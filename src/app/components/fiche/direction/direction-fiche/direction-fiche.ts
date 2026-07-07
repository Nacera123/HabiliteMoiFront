import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Return } from '../../../button/return/return';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Direction } from '../../../../models/direction';
import { DirectionService } from '../../../../services/direction/direction-service';

@Component({
  selector: 'app-direction-fiche',
  standalone: true,
  imports: [
    CommonModule,
    Return,
    RouterModule,
  ],
  templateUrl: './direction-fiche.html',
  styleUrl: './direction-fiche.css',
})
export class DirectionFiche implements OnInit{


  directions: Direction[] = [];

  selectedDirection = signal<Direction | undefined>(undefined);

  constructor(
    private directionService: DirectionService,
    private routeActivated: ActivatedRoute
  ){
    const id = this.routeActivated.snapshot.paramMap.get('id');
    if (id) {
      this.getDirectionbyId(Number(id));
    }else {
      console.error('No employe ID provided in route parameters.');
    }
  }

  ngOnInit() {
    // Logic to execute on component initialization
  }


  getDirectionbyId(id?: number) {
    this.directionService.getById(id).subscribe({
      next: (direction) => this.selectedDirection.set(direction),
      error: (error) => console.error(error)
    });
  }
}
