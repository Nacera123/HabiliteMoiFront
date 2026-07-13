import { Component, OnInit, OnDestroy, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { EmployeService } from '../../services/employe/employe-service';
import { SearchService } from '../../services/search-service'; // 👈 adapte le chemin
import { Employe } from '../../models/employe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { See } from '../../components/button/see/see';
import { Add } from '../../components/button/add/add';
import { Update } from '../../components/button/update/update';
import { ConfirmService } from '../../services/confirm/confirm';
import { Delete } from '../../components/button/delete/delete';

@Component({
  selector: 'app-employes',
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
  templateUrl: './employes.html',
  styleUrl: './employes.css',
})
export class Employes implements OnInit, OnDestroy {

  employes: Employe[] = [];
  employeSelectionne?: Employe;
  errorMessage = signal<string>('');
  searchTerm = '';
  private searchSub?: Subscription;

  //pagination
  currentPage = 1;
  pageSize = 10;

  get employesFiltres(): Employe[] {
    console.log('🟢 Filtrage avec searchTerm =>', this.searchTerm, '| nb employes =>', this.employes.length);
    if (!this.searchTerm) return this.employes;
    const term = this.searchTerm.toLowerCase();
    const result = this.employes.filter(e =>
      e.nom.toLowerCase().includes(term) ||
      e.prenom.toLowerCase().includes(term) ||
      e.email.toLowerCase().includes(term)
    );
    console.log('🟢 Résultat filtré =>', result);
    return result;
  }

  get employesPagines(): Employe[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.employesFiltres.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.employesFiltres.length / this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  constructor(
    private employeService: EmployeService,
    private searchService: SearchService,
    private cdr: ChangeDetectorRef,
    private confirmService: ConfirmService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getEmployes();

    this.searchSub = this.searchService.searchTerm.subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1; // reset pagination à chaque nouvelle recherche
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }

  getEmployes() {
    this.employeService.getEmployes().subscribe({
      next: (response) => {
        this.employes = response;
        this.currentPage = 1;
        this.cdr.detectChanges();
      },
      error: (error) => this.errorMessage.set(error.message ?? 'Erreur')
    });
  }

  // Méthode pour gérer le changement de page
  pageChanged(event: any): void {
    this.currentPage = event;
  }


  async deleteEmploye(employe: Employe): Promise<void> {
    const ok = await this.confirmService.ask(
      `Voulez-vous vraiment supprimer ${employe.nom} ${employe.prenom}`
    );

    if (!ok) return;

      this.employeService.delete(employe.id).subscribe({
        next: () => {
          alert("L'employé a bien été supprimé");
          this.getEmployes();
        },
        error: (error) => this.errorMessage.set(error.message ?? 'Erreur')
    });
    
      
  }

   
  

}