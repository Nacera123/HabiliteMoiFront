import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { See } from '../../components/button/see/see';
import { Add } from '../../components/button/add/add';
import { Update } from '../../components/button/update/update';
import { Delete } from '../../components/button/delete/delete';
import { Pole } from '../../models/pole';
import { Subscription } from 'rxjs';
import { PoleService } from '../../services/pole/pole-service';
import { SearchService } from '../../services/search-service';
import { ConfirmService } from '../../services/confirm/confirm';

@Component({
  selector: 'app-poles',
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
  templateUrl: './poles.html',
  styleUrl: './poles.css',
})
export class Poles implements OnInit{

  
  poles: Pole[] = [];
  poleSelectionne?: Pole;
  errormsg?: string;
  searchTerm = '';
  private searchSub?: Subscription;

  //pagination
  currentPage = 1;
  pageSize = 10;

  get poleFiltres(): Pole[] {
    console.log('🟢 Filtrage avec searchTerm =>', this.searchTerm, '| nb directions =>', this.poles.length);
    if (!this.searchTerm) return this.poles;
    const term = this.searchTerm.toLowerCase();
    const result = this.poles.filter(p =>
      p.nom.toLowerCase().includes(term) ||
      p.direction.service.toLowerCase().includes(term), 
    );
    console.log('🟢 Résultat filtré =>', result);
    return result;
  }

  get polesPagines(): Pole[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.poleFiltres.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.poleFiltres.length / this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  constructor(
    private poleService: PoleService,
    private searchService: SearchService,
    private cdr: ChangeDetectorRef,
    private confirmService: ConfirmService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPoles();

    this.searchSub = this.searchService.searchTerm.subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1; // reset pagination à chaque nouvelle recherche
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }
  getPoles() {
    this.poleService.getPole().subscribe({
      next: (response) => {
        this.poles = response;
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
  async deletePole(pole: Pole): Promise<void> {
    const ok = await this.confirmService.ask(
      `Voulez-vous vraiment supprimer ${pole.nom}`
    );

    if (!ok) return;

      this.poleService.delete(pole.id).subscribe({
        next: () => {
          alert("Le pole a bien été supprimé");
          this.getPoles();
        },
        error: (err) => {
          console.error('Erreur (mais suppression probablement OK côté serveur) :', err);
        }
    });
    
      
  }

}
