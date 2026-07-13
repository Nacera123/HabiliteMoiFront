import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterEvent, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { TypehabilitationService } from '../../services/typeHabilitation/typehabilitation-service';
import { SearchService } from '../../services/search-service';
import { TypeHabilitation } from '../../models/TypeHabilitation';
import { ConfirmService } from '../../services/confirm/confirm';
import { NgxPaginationModule } from 'ngx-pagination';
import { See } from '../../components/button/see/see';
import { Add } from '../../components/button/add/add';
import { Update } from '../../components/button/update/update';
import { Delete } from '../../components/button/delete/delete';

@Component({
  selector: 'app-type-habilitations',
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
  templateUrl: './type-habilitations.html',
  styleUrl: './type-habilitations.css',
})
export class TypeHabilitations implements OnInit, OnDestroy{

  typeHabilitation = signal<TypeHabilitation[]>([]);
  typeSelectionne?: TypeHabilitation;
  errorMessage = signal<string>('');
  searchTerm = '';
  private searchSub?: Subscription;

  currentPage = 1;
  pagesize = 10;

  constructor(
    private typeHabilitationService: TypehabilitationService,
    private searchservice: SearchService,
    private confirmService: ConfirmService,
    private cdr: ChangeDetectorRef,
  ){}
  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.getTypeHabilitation();

    this.searchSub = this.searchservice.searchTerm.subscribe(term => {
      this.searchTerm = term;
      this.cdr.detectChanges();
      this.currentPage = 1; // reset pagination à chaque nouvelle recherche
    });    
  }


  getTypeHabilitation(){
    this.typeHabilitationService.getAll()
      .subscribe({
        next: (response) => {
          this.typeHabilitation.set(response)
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = error;
        }
      })
  }

  async deleteType(type: TypeHabilitation): Promise<void> {

    const ok = await this.confirmService.ask(
      `Voulez-vous vraiment supprimer ${type.type}`
    );

    if(!ok) return;

    this.typeHabilitationService.delete(type.id)
      .subscribe({
        next: () => {
          alert("Le type d'habilitation a bien été supprimé !");
          this.getTypeHabilitation();
        },
        error: (error) => {
          this.errorMessage.set(error.message ?? 'Erreur')
        }
      })
  }

  // cahngement de page
  pageChanged(event: any): void {
    this.currentPage = event;
  }

  get typesFiltres(): TypeHabilitation[] {
    console.log('🟢 Filtrage avec searchTerm =>', this.searchTerm, '| nb types =>', this.typeHabilitation().length);
    if (!this.searchTerm) return this.typeHabilitation();
    const term = this.searchTerm.toLowerCase();
    const result = this.typeHabilitation().filter(t =>
      t.type.toLowerCase().includes(term) 
    );
    console.log('🟢 Résultat filtré =>', result);
    return result;
  }

    get typesPagines(): TypeHabilitation[] {
      const start = (this.currentPage - 1) * this.pagesize;
      return this.typesFiltres.slice(start, start + this.pagesize);
    }

  get totalPages(): number {
    return Math.ceil(this.typesFiltres.length / this.pagesize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

}
