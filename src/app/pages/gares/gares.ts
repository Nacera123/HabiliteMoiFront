import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { See } from '../../components/button/see/see';
import { Add } from '../../components/button/add/add';
import { Delete } from '../../components/button/delete/delete';
import { Update } from '../../components/button/update/update';
import { Gare } from '../../models/gare';
import { Subscription } from 'rxjs';
import { GareService } from '../../services/gare/gare-service';
import { SearchService } from '../../services/search-service';
import { ConfirmService } from '../../services/confirm/confirm';

@Component({
  selector: 'app-gares',
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
  templateUrl: './gares.html',
  styleUrl: './gares.css',
})
export class Gares implements OnInit, OnDestroy {

  gares: Gare[] = [];
  gareSelectionne?: Gare;
  errormsg?: string;
  searchTerm = '';
  private searchSub?: Subscription;

  //pagination
  currentPage = 1;
  pageSize = 10;

  get garesFiltres(): Gare[] {
    console.log('🟢 Filtrage avec searchTerm =>', this.searchTerm, '| nb gares =>', this.gares.length);
    if (!this.searchTerm) return this.gares;
    const term = this.searchTerm.toLowerCase();
    const result = this.gares.filter(g =>
      g.nom.toLowerCase().includes(term),
    );
    console.log('🟢 Résultat filtré =>', result);
    return result;
  }

  get garesPagines(): Gare[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.garesFiltres.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.garesFiltres.length / this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  constructor(
    private gareService: GareService,
    private searchService: SearchService,
    private cdr: ChangeDetectorRef,
    private confirmService: ConfirmService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getGares();

    this.searchSub = this.searchService.searchTerm.subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1; // reset pagination à chaque nouvelle recherche
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }

  getGares() {
    this.gareService.getAll().subscribe({
      next: (response) => {
        this.gares = response;
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


  async deleteGare(gare: Gare): Promise<void> {
    const ok = await this.confirmService.ask(
      `Voulez-vous vraiment supprimer ${gare.nom}`
    );

    if (!ok) return;

      this.gareService.delete(gare.id).subscribe({
        next: () => {
          alert("La gare a bien été supprimée");
          this.getGares();
        },
        error: (err) => {
          console.error('Erreur (mais suppression probablement OK côté serveur) :', err);
        }
    });
    
      
  }

   
  

}