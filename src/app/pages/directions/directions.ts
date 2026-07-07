import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Direction } from '../../models/direction';
import { Subscription } from 'rxjs';
import { DirectionService } from '../../services/direction/direction-service';
import { SearchService } from '../../services/search-service';
import { ConfirmService } from '../../services/confirm/confirm';
import { See } from '../../components/button/see/see';
import { Add } from '../../components/button/add/add';
import { Update } from '../../components/button/update/update';
import { Delete } from '../../components/button/delete/delete';

@Component({
  selector: 'app-directions',
  standalone: true,
  imports: [
    CommonModule, 
    NgxPaginationModule,
    RouterModule, 
    See,
    Add,
    Update,
    Delete,

  ],
  templateUrl: './directions.html',
  styleUrl: './directions.css',
})
export class Directions implements OnInit{

  directions: Direction[] = [];
  directionSelectionne?: Direction;
  errormsg?: string;
  searchTerm = '';
  private searchSub?: Subscription;

  //pagination
  currentPage = 1;
  pageSize = 10;

  get directionsFiltres(): Direction[] {
    console.log('🟢 Filtrage avec searchTerm =>', this.searchTerm, '| nb directions =>', this.directions.length);
    if (!this.searchTerm) return this.directions;
    const term = this.searchTerm.toLowerCase();
    const result = this.directions.filter(d =>
      d.service.toLowerCase().includes(term) 
    );
    console.log('🟢 Résultat filtré =>', result);
    return result;
  }

  get directionsPagines(): Direction[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.directionsFiltres.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.directionsFiltres.length / this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  constructor(
    private directionService: DirectionService,
    private searchService: SearchService,
    private cdr: ChangeDetectorRef,
    private confirmService: ConfirmService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getdirections();

    this.searchSub = this.searchService.searchTerm.subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1; // reset pagination à chaque nouvelle recherche
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }
  getdirections() {
    this.directionService.getDirection().subscribe({
      next: (response) => {
        this.directions = response;
        this.currentPage = 1;
        this.cdr.detectChanges();
      },
      error: (error) => this.errormsg = error
    });
  }

  // Méthode pour gérer le changement de page
  pageChanged(event: any): void {
    this.currentPage = event;
  }


  //Methode pour supprimer
  async deleteDirection(direction: Direction): Promise<void> {
    const ok = await this.confirmService.ask(
      `Voulez-vous vraiment supprimer ${direction.service}`
    );

    if (!ok) return;

      this.directionService.delete(direction.id).subscribe({
        next: () => {
          alert("L'employé a bien été supprimé");
          this.getdirections();
        },
        error: (err) => {
          console.error('Erreur (mais suppression probablement OK côté serveur) :', err);
        }
    });
    
      
  }
  
}
