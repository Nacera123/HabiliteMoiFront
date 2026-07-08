import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pole } from '../../../models/pole';
import { Employe } from '../../../models/employe';
import { Direction } from '../../../models/direction';
import { PoleService } from '../../../services/pole/pole-service';
import { EmployeService } from '../../../services/employe/employe-service';
import { DirectionService } from '../../../services/direction/direction-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pole-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pole-form.html',
  styleUrl: './pole-form.css',
})
export class PoleForm implements OnInit {

  form!: FormGroup;
  formulaire!: Pole;
  errorMessage = signal<string>('');
  employes: Employe[] = [];
  direction: Direction[] = [];

  constructor(
    private poleService: PoleService,
    private employeService: EmployeService,
    private directionService: DirectionService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  compareEmploye(e1: Employe, e2: Employe): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }  
  compareDirection(e1: Direction, e2: Direction): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

ngOnInit(): void {

  this.form = this.fb.group({
    nom: ['', Validators.required],
    direction: [null, Validators.required],
    employes: [null],
    adjoint: [false],
  });

  this.activatedRoute.params.subscribe(params => {

    const id = params['id'];

    this.employeService.getEmployes().subscribe({
      next: (employes) => {

        this.employes = employes;

        this.directionService.getDirection().subscribe({
          next: (directions) => {

            this.direction = directions;

            if (id) {

              this.poleService.getById(id).subscribe({
                next: (formulaire) => {

                  this.formulaire = formulaire;

                  const employe = this.employes.find(
                    e => e.id === formulaire.employes?.id
                  );

                  const direction = this.direction.find(
                    d => d.id === formulaire.direction?.id
                  );

                  this.form.patchValue({
                    nom: formulaire.nom,
                    employes: employe ?? null,
                    direction: direction ?? null,
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

    const pole: Pole = {
      nom: this.form.value.nom,
      adjoint: this.form.value.adjoint,
      direction: this.form.value.direction,
      employes: this.form.value.employes
    };

    const request = this.formulaire?.id
      ? this.poleService.update({ id: this.formulaire.id, ...pole })
      : this.poleService.add(pole);

    request.subscribe({
      next: () => {
        alert(this.formulaire ? 'Pôle modifiée' : 'Pôle ajoutée');
        this.router.navigate(['admin/pole']);
      },
      error: (error) => {
        console.error(error);
        this.errorMessage.set(error.message ?? 'Erreur');
      }
    });
  }

}