import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { See } from '../../components/button/see/see';
import { Add } from '../../components/button/add/add';
import { Delete } from '../../components/button/delete/delete';
import { Update } from '../../components/button/update/update';
import { HabilitationPostePole } from '../../models/HabilitationPostePole';
import { Subscription } from 'rxjs';
import { LienPostePoleService } from '../../services/lienPostePole/lien-poste-pole-service';
import { SearchService } from '../../services/search-service';
import { ConfirmService } from '../../services/confirm/confirm';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lien-poste-pole',
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
  templateUrl: './lien-poste-pole.html',
  styleUrl: './lien-poste-pole.css',
})
export class LienPostePole implements OnInit{

  
  lienPostePole: HabilitationPostePole[] = [];
  lienSelectionne?: HabilitationPostePole;
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


  updateStatut(lien: HabilitationPostePole, nouveauStatut: string): void {
    const lienPole: HabilitationPostePole = {
      ...lien,
      statutHabilitation: nouveauStatut as any,
    };

    this.lienPostePoleService.update1(lienPole).subscribe({
      next: () => {
        lien.statutHabilitation = nouveauStatut as any;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = error.message ?? 'Erreur lors de la mise à jour du statut';
      }
    });
  }


  get lienFiltres(): HabilitationPostePole[] {
    console.log('🟢 Filtrage avec searchTerm =>', this.searchTerm, '| nb lienPostePole =>', this.lienPostePole.length);
    if (!this.searchTerm) return this.lienPostePole;
    const term = this.searchTerm.toLowerCase();
    const result = this.lienPostePole.filter(pp =>
      pp.habilitationPole?.habilitationDirection?.lienHabilitation?.outil.toLowerCase().includes(term) ||
      pp.habilitationPole?.habilitationDirection?.lienHabilitation?.lien.toLowerCase().includes(term) ||
      pp.habilitationPole?.habilitationDirection?.lienHabilitation?.urlHabilitation.toLowerCase().includes(term) ||
      pp.habilitationPole?.habilitationDirection?.lienHabilitation?.description.toLowerCase().includes(term) ||
      pp.habilitationPole?.habilitationDirection?.lienHabilitation?.typeHabilitation?.type.toLowerCase().includes(term) ||
      pp.habilitationPole?.habilitationDirection?.direction?.service.toLowerCase().includes(term) ||
      pp.habilitationPole?.pole?.nom.toLowerCase().includes(term) ||
      pp.poste?.employes?.nom.toLowerCase().includes(term) ||
      pp.poste?.employes?.prenom.toLowerCase().includes(term) ||
      pp.poste?.responsable?.employes?.nom.toLowerCase().includes(term) ||
      pp.poste?.responsable?.employes?.prenom.toLowerCase().includes(term) ||
      pp.statutHabilitation?.toLowerCase().includes(term)
    );
    console.log('🟢 Résultat filtré =>', result);
    return result;
  }

  get liensPagines(): HabilitationPostePole[] {
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
    private lienPostePoleService: LienPostePoleService,
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
    this.lienPostePoleService.getAll().subscribe({
      next: (response) => {
        this.lienPostePole = response;
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
  async deleteLiens(lienPostePole: HabilitationPostePole): Promise<void> {
    const ok = await this.confirmService.ask(
      `Voulez-vous vraiment supprimer ${lienPostePole.habilitationPole?.habilitationDirection?.lienHabilitation?.lien}`
    );

    if (!ok) return;

      this.lienPostePoleService.delete(lienPostePole.id).subscribe({
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

