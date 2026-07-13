import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Direction } from '../../../models/direction';
import { Employe } from '../../../models/employe';
import { Pole } from '../../../models/pole';
import { Poste } from '../../../models/poste';

import { DirectionService } from '../../../services/direction/direction-service';
import { EmployeService } from '../../../services/employe/employe-service';
import { PoleService } from '../../../services/pole/pole-service';
import { PosteService } from '../../../services/poste/poste-service';

import { NgSelectModule } from '@ng-select/ng-select';
import { Validate } from '../../button/validate/validate';
import { ReturnForm } from '../../button/return-form/return-form';

@Component({
  selector: 'app-direction-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    Validate,
    ReturnForm,
    RouterModule,
  ],
  templateUrl: './direction-form.html',
  styleUrl: './direction-form.css',
})
export class DirectionForm implements OnInit {

  form!: FormGroup;
  formulaire!: Direction;
  errorMessage = signal<string>('');

  employes = signal<Employe[]>([]);
  poles = signal<Pole[]>([]);
  postes = signal<Poste[]>([]);

  // Liste filtrée : employés non rattachés à un pôle ou un poste
  employesDisponibles = computed(() => {
    const poles = this.poles();
    const postes = this.postes();

    return this.employes().filter(employe => {
      const dansPole = poles.some(p => p.employes?.id === employe.id);
      const dansPoste = postes.some(p => p.employes?.id === employe.id);
      return !dansPole && !dansPoste;
    });
  });

  constructor(
    private directionService: DirectionService,
    private employeService: EmployeService,
    private poleService: PoleService,
    private posteService: PosteService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  compareEmploye(e1: Employe, e2: Employe): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      service: ['', Validators.required],
      employes: [null],
      adjoint: [false],
    });

    this.activatedRoute.params.subscribe(params => {

      const id = params['id'];

      this.employeService.getEmployes().subscribe({
        next: (response) => {
          this.employes.set(response);

          this.poleService.getPole().subscribe({
            next: (poles) => this.poles.set(poles),
            error: (error) => console.error(error)
          });

          this.posteService.getPoste().subscribe({
            next: (postes) => this.postes.set(postes),
            error: (error) => console.error(error)
          });

          if (id) {

            this.directionService.getById(id).subscribe({
              next: (formulaire) => {

                this.formulaire = formulaire;

                const employe = this.employes().find(
                  e => e.id === formulaire.employes?.id
                );

                this.form.patchValue({
                  service: formulaire.service,
                  employes: employe ?? null,
                  adjoint: formulaire.adjoint
                });

              },
              error: (error) => {
                console.error(error);
                this.errorMessage.set(error.message ?? 'Erreur');
              }
            });

          }

        },
        error: (error) => {
          console.error(error);
        }
      });

    });

  }

  toggleAdjoint(): void {
    this.form.patchValue({
      adjoint: !this.form.value.adjoint
    });
  }

  create(): void {

    const direction: Direction = {
      service: this.form.value.service,
      adjoint: this.form.value.adjoint,
      employes: this.form.value.employes
    };

    const request = this.formulaire?.id
      ? this.directionService.update({ id: this.formulaire.id, ...direction })
      : this.directionService.add(direction);

    request.subscribe({
      next: () => {
        alert(this.formulaire ? 'Direction modifiée' : 'Direction ajoutée');
        this.router.navigate(['admin/direction']);
      },
      error: (error) => {
        console.error(error);
        this.errorMessage.set(error.message ?? 'Erreur');
      }
    });
  }

}