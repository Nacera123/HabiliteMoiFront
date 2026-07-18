import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { See } from '../../components/button/see/see';
import { Add } from '../../components/button/add/add';
import { Update } from '../../components/button/update/update';
import { Delete } from '../../components/button/delete/delete';
import { FormsModule } from '@angular/forms';
import { HabilitationPole } from '../../models/HabilitationPole';
import { Subscription } from 'rxjs';
import { LienPoleService } from '../../services/lienPole/lien-pole-service';
import { SearchService } from '../../services/search-service';
import { ConfirmService } from '../../services/confirm/confirm';

@Component({
  selector: 'app-lien-detail-pole',
  standalone: true,
  imports: [
    CommonModule, 
    NgxPaginationModule,
    RouterModule, 
    See,
    Add,
    Update,
    Delete,
    FormsModule,

  ],
  templateUrl: './lien-detail-pole.html',
  styleUrl: './lien-detail-pole.css',
})
export class LienDetailPole implements OnInit{

  
  lienPole: HabilitationPole[] = [];
  lienSelectionne?: HabilitationPole;
  errorMessage?: string;
  searchTerm = '';
  private searchSub?: Subscription;

  //pagination
  currentPage = 1;
  pageSize = 10;


  getStatutClass(statut: string | undefined): string {
    switch (statut) {
      case 'En attente': return 'en-attente';
      case 'A demander': return 'a-demander';
      case 'Ok': return 'ok';
      case 'Refusé': return 'refuse';
      default: return '';
    }
  }

  updateStatut(lien: HabilitationPole, nouveauStatut: string): void {
    const lienPole: HabilitationPole = {
      ...lien,
      statutHabilitation: nouveauStatut as any,
    };

    this.lienPoleService.update1(lienPole).subscribe({
      next: () => {
        lien.statutHabilitation = nouveauStatut as any;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = error.message ?? 'Erreur lors de la mise à jour du statut';
      }
    });
  }





  get lienFiltres(): HabilitationPole[] {
    console.log('🟢 Filtrage avec searchTerm =>', this.searchTerm, '| nb lienPole =>', this.lienPole.length);
    if (!this.searchTerm) return this.lienPole;
    const term = this.searchTerm.toLowerCase();
    const result = this.lienPole.filter(p =>
      p.habilitationDirection?.lienHabilitation?.outil.toLowerCase().includes(term) ||
      p.habilitationDirection?.lienHabilitation?.lien.toLowerCase().includes(term) ||
      p.habilitationDirection?.lienHabilitation?.urlHabilitation.toLowerCase().includes(term) ||
      p.habilitationDirection?.lienHabilitation?.description.toLowerCase().includes(term) ||
      p.habilitationDirection?.lienHabilitation?.typeHabilitation?.type.toLowerCase().includes(term) ||
      p.pole?.direction?.service.toLowerCase().includes(term) ||
      p.pole?.nom.toLowerCase().includes(term) ||
      p.statutHabilitation?.toLowerCase().includes(term)
      // p.statutHabilitation?.status?.toLowerCase().includes(term)
    );
    console.log('🟢 Résultat filtré =>', result);
    return result;
  }

  get liensPagines(): HabilitationPole[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.lienFiltres.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.lienFiltres.length / this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  constructor(
    private lienPoleService: LienPoleService,
    private searchService: SearchService,
    private cdr: ChangeDetectorRef,
    private confirmService: ConfirmService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getLiens();

    this.searchSub = this.searchService.searchTerm.subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1; // reset pagination à chaque nouvelle recherche
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }
  getLiens() {
    this.lienPoleService.getAll().subscribe({
      next: (response) => {
        this.lienPole = response;
        this.currentPage = 1;
        this.cdr.detectChanges();
      },
      error: (error) => this.errorMessage = error
    });
  }

  // Méthode pour gérer le changement de page
  pageChanged(event: any): void {
    this.currentPage = event;
  }


  //Methode pour supprimer
  async deleteLiens(lienPole: HabilitationPole): Promise<void> {
    const ok = await this.confirmService.ask(
      `Voulez-vous vraiment supprimer ${lienPole.habilitationDirection?.lienHabilitation?.lien}`
    );

    if (!ok) return;

      this.lienPoleService.delete(lienPole.id).subscribe({
        next: () => {
          alert("Le lien a bien été supprimé");
          this.getLiens();
        },
        error: (err) => {
          console.error('Erreur (mais suppression probablement OK côté serveur) :', err);
        }
    });
    
      
  }

}


