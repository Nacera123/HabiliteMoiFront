import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Return } from '../../button/return/return';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Poste } from '../../../models/poste';
import { PosteService } from '../../../services/poste/poste-service';

@Component({
  selector: 'app-poste-fiche',
  standalone: true,
  imports: [
    CommonModule,
    Return,
    RouterModule,
  ],
  templateUrl: './poste-fiche.html',
  styleUrl: './poste-fiche.css',
})
export class PosteFiche implements OnInit{


  postes: Poste[] = [];

  selectedPoste = signal<Poste | undefined>(undefined);

  constructor(
    private posteService: PosteService,
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
    this.posteService.getById(id).subscribe({
      next: (poste) => this.selectedPoste.set(poste),
      error: (error) => console.error(error)
    });
  }
}


