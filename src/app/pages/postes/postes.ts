import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { See } from '../../components/button/see/see';
import { Add } from '../../components/button/add/add';
import { Update } from '../../components/button/update/update';
import { Delete } from '../../components/button/delete/delete';
import { Poste } from '../../models/poste';
import { Subscription } from 'rxjs';
import { PosteService } from '../../services/poste/poste-service';
import { SearchService } from '../../services/search-service';
import { ConfirmService } from '../../services/confirm/confirm';

@Component({
  selector: 'app-postes',
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

  templateUrl: './postes.html',
  styleUrl: './postes.css',
})
export class Postes implements OnInit{

  
  postes: Poste[] = [];
  posteSelectionne?: Poste;
  errormsg?: string;
  searchTerm = '';
  private searchSub?: Subscription;

  //pagination
  currentPage = 1;
  pageSize = 10;

  get posteFiltres(): Poste[] {
    console.log('🟢 Filtrage avec searchTerm =>', this.searchTerm, '| nb directions =>', this.postes.length);
    if (!this.searchTerm) return this.postes;
    const term = this.searchTerm.toLowerCase();
    const result = this.postes.filter(p =>
      p.intitule.toLowerCase().includes(term) ||
      p.pole?.nom.toLowerCase().includes(term) ||
      p.direction?.service.toLowerCase().includes(term), 
    );
    console.log('🟢 Résultat filtré =>', result);
    return result;
  }

  get postesPagines(): Poste[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.posteFiltres.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.posteFiltres.length / this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  constructor(
    private posteService: PosteService,
    private searchService: SearchService,
    private cdr: ChangeDetectorRef,
    private confirmService: ConfirmService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPostes();

    this.searchSub = this.searchService.searchTerm.subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1; // reset pagination à chaque nouvelle recherche
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }
  getPostes() {
    this.posteService.getPoste().subscribe({
      next: (response) => {
        this.postes = response;
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
  async deletePoste(poste: Poste): Promise<void> {
    const ok = await this.confirmService.ask(
      `Voulez-vous vraiment supprimer ${poste.intitule}`
    );

    if (!ok) return;

      this.posteService.delete(poste.id).subscribe({
        next: () => {
          alert("Le poste a bien été supprimé");
          this.getPostes();
        },
        error: (err) => {
          console.error('Erreur (mais suppression probablement OK côté serveur) :', err);
        }
    });
    
      
  }

}
