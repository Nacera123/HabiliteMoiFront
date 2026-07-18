import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { See } from '../../components/button/see/see';
import { Add } from '../../components/button/add/add';
import { Delete } from '../../components/button/delete/delete';
import { Update } from '../../components/button/update/update';
import { HabilitationDirection } from '../../models/HabilitationDirection';
import { Subscription } from 'rxjs';
import { LienDirectionService } from '../../services/lienDirection/lien-direction-service';
import { SearchService } from '../../services/search-service';
import { ConfirmService } from '../../services/confirm/confirm';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lien-direction',
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
  templateUrl: './lien-direction.html',
  styleUrl: './lien-direction.css',
})
export class LienDirection implements OnInit{

  
  lienDirection: HabilitationDirection[] = [];
  lienDirectionFiltres: HabilitationDirection[] = [];
  directionId?: number;
  lienSelectionne?: HabilitationDirection;
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

  updateStatut(lien: HabilitationDirection, nouveauStatut: string): void {
    const habilitationDirection: HabilitationDirection = {
      ...lien,
      statutHabilitation: nouveauStatut as any,
    };

    this.lienDirectionService.update(habilitationDirection).subscribe({
      next: () => {
        lien.statutHabilitation = nouveauStatut as any;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = error.message ?? 'Erreur lors de la mise à jour du statut';
      }
    });
  }

  get lienFiltres(): HabilitationDirection[] {
    const base = this.directionId
      ? this.lienDirection.filter(d => d.direction?.id === this.directionId)
      : this.lienDirection;

    if (!this.searchTerm) return base;
    const term = this.searchTerm.toLowerCase();
    return base.filter(d =>
      d.lienHabilitation?.outil.toLowerCase().includes(term) ||
      d.lienHabilitation?.lien.toLowerCase().includes(term) ||
      d.lienHabilitation?.urlHabilitation.toLowerCase().includes(term) ||
      d.lienHabilitation?.description.toLowerCase().includes(term) ||
      d.lienHabilitation?.typeHabilitation?.type.toLowerCase().includes(term) ||
      d.direction?.service.toLowerCase().includes(term) ||
      d.statutHabilitation?.toLowerCase().includes(term)
    );
  }

  get liensPagines(): HabilitationDirection[] {
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
    private lienDirectionService: LienDirectionService,
    private searchService: SearchService,
    private cdr: ChangeDetectorRef,
    private confirmService: ConfirmService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.directionId = params['id'] ? +params['id'] : undefined;
      this.getLiens();
    });

    this.searchSub = this.searchService.searchTerm.subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }

  getLiens() {
    this.lienDirectionService.getAll().subscribe({
      next: (response) => {
        this.lienDirection = response;
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
  async deleteLiens(lienDirection: HabilitationDirection): Promise<void> {
    const ok = await this.confirmService.ask(
      `Voulez-vous vraiment supprimer ${lienDirection.lienHabilitation?.lien}`
    );

    if (!ok) return;

      this.lienDirectionService.delete(lienDirection.id).subscribe({
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