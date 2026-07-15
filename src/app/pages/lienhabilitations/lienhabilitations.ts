import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { See } from '../../components/button/see/see';
import { Add } from '../../components/button/add/add';
import { Update } from '../../components/button/update/update';
import { Delete } from '../../components/button/delete/delete';
import { TypeHabilitation } from '../../models/TypeHabilitation';
import { Lienhabilitation } from '../../models/lienhabilitation';
import { Subscription } from 'rxjs';
import { LienhabilitationService } from '../../services/lienHabilitation/lienhabilitation-service';
import { SearchService } from '../../services/search-service';
import { ConfirmService } from '../../services/confirm/confirm';

@Component({
  selector: 'app-lienhabilitations',
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
  templateUrl: './lienhabilitations.html',
  styleUrl: './lienhabilitations.css',
})
export class Lienhabilitations implements OnInit, OnDestroy{

  lienHabilitation: Lienhabilitation[] = [];
  lienSelectionne?: Lienhabilitation;
  errorMessage = signal<string>('');
  searchTerm = '';
  private searchSub?: Subscription;

  //pagination
  currentPage = 1;
  pageSize = 10;


  get lienFiltres(): Lienhabilitation[] {
    console.log('🟢 Filtrage avec searchTerm =>', this.searchTerm, '| nb directions =>', this.lienHabilitation.length);
    if (!this.searchTerm) return this.lienHabilitation;
    const term = this.searchTerm.toLowerCase();
    const result = this.lienHabilitation.filter(l =>
      l.outil.toLowerCase().includes(term) ||
      l.typeHabilitation?.type.toLowerCase().includes(term) 
    );
    console.log('🟢 Résultat filtré =>', result);
    return result;
  }

  get liensPagines(): Lienhabilitation[] {
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
    private liensHabilitationService: LienhabilitationService,
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
    this.liensHabilitationService.getAll().subscribe({
      next: (response) => {
        this.lienHabilitation = response;
        this.currentPage = 1;
        this.cdr.detectChanges();
      },
        error: (error) => {
          console.error(error);
          this.errorMessage = error;
        }
    });
  }

  // Méthode pour gérer le changement de page
  pageChanged(event: any): void {
    this.currentPage = event;
  }


  //Methode pour supprimer
  async deletelien(lienHabilitation: Lienhabilitation): Promise<void> {
    const ok = await this.confirmService.ask(
      `Voulez-vous vraiment supprimer ce lien : ${lienHabilitation.lien}`
    );

    if (!ok) return;

      this.liensHabilitationService.delete(lienHabilitation.id).subscribe({
        next: () => {
          alert("Le poste a bien été supprimé");
          this.getLiens();
        },
        error: (err) => {
          console.error('Erreur (mais suppression probablement OK côté serveur) :', err);
        }
    });
    
      
  }

}
