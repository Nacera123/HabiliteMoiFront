import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { See } from '../../components/button/see/see';
import { Add } from '../../components/button/add/add';
import { Update } from '../../components/button/update/update';
import { Delete } from '../../components/button/delete/delete';
import { HabilitationPosteDirection } from '../../models/HabilitationPosteDirection';
import { Subscription } from 'rxjs';
import { LienPosteDirectionService } from '../../services/lienPosteDirection/lien-poste-direction-service';
import { SearchService } from '../../services/search-service';
import { ConfirmService } from '../../services/confirm/confirm';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lien-poste-direction',
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
  templateUrl: './lien-poste-direction.html',
  styleUrl: './lien-poste-direction.css',
})
export class LienPosteDirection implements OnInit{

  
  lienPosteDirection: HabilitationPosteDirection[] = [];
  lienSelectionne?: HabilitationPosteDirection;
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

  updateStatut(lien: HabilitationPosteDirection, nouveauStatut: string): void {
    const lienPole: HabilitationPosteDirection = {
      ...lien,
      statutHabilitation: nouveauStatut as any,
    };

    this.lienPosteDirectionService.update1(lienPole).subscribe({
      next: () => {
        lien.statutHabilitation = nouveauStatut as any;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = error.message ?? 'Erreur lors de la mise à jour du statut';
      }
    });
  }
  

  get lienFiltres(): HabilitationPosteDirection[] {
    console.log('🟢 Filtrage avec searchTerm =>', this.searchTerm, '| nb lienPosteDirection =>', this.lienPosteDirection.length);
    if (!this.searchTerm) return this.lienPosteDirection;
    const term = this.searchTerm.toLowerCase();
    const result = this.lienPosteDirection.filter(pd =>
      pd.habilitationDirection?.lienHabilitation?.outil.toLowerCase().includes(term) ||
      pd.habilitationDirection?.lienHabilitation?.lien.toLowerCase().includes(term) ||
      pd.habilitationDirection?.lienHabilitation?.urlHabilitation.toLowerCase().includes(term) ||
      pd.habilitationDirection?.lienHabilitation?.description.toLowerCase().includes(term) ||
      pd.habilitationDirection?.lienHabilitation?.typeHabilitation?.type.toLowerCase().includes(term) ||
      pd.habilitationDirection?.direction?.service.toLowerCase().includes(term) ||
      pd.poste?.employes?.nom.toLowerCase().includes(term) ||
      pd.poste?.employes?.prenom.toLowerCase().includes(term) ||
      pd.poste?.responsable?.employes?.nom.toLowerCase().includes(term) ||
      pd.poste?.responsable?.employes?.prenom.toLowerCase().includes(term) ||
      pd.statutHabilitation?.toLowerCase().includes(term)
    );
    console.log('🟢 Résultat filtré =>', result);
    return result;
  }

  get liensPagines(): HabilitationPosteDirection[] {
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
    private lienPosteDirectionService: LienPosteDirectionService,
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
    this.lienPosteDirectionService.getAll().subscribe({
      next: (response) => {
        this.lienPosteDirection = response;
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
  async deleteLiens(lienPostedirection: HabilitationPosteDirection): Promise<void> {
    const ok = await this.confirmService.ask(
      `Voulez-vous vraiment supprimer ${lienPostedirection.habilitationDirection?.lienHabilitation?.lien}`
    );

    if (!ok) return;

      this.lienPosteDirectionService.delete(lienPostedirection.id).subscribe({
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

