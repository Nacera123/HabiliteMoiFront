import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Direction } from '../../../models/direction';
import { Employe } from '../../../models/employe';

import { DirectionService } from '../../../services/direction/direction-service';
import { EmployeService } from '../../../services/employe/employe-service';

@Component({
  selector: 'app-direction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './direction-form.html',
  styleUrl: './direction-form.css',
})
export class DirectionForm implements OnInit {

  form!: FormGroup;
  formulaire!: Direction;
  errorMessage = signal<string>('');
  employes: Employe[] = [];

  constructor(
    private directionService: DirectionService,
    private employeService: EmployeService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      service: ['', Validators.required],
      employes: [null],
      adjoint: [false],
    });

    this.employeService.getEmployes().subscribe({
      next: (response) => this.employes = response,
      error: (error) => console.error(error)
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];

      if (id) {
        this.directionService.getById(id).subscribe({
          next: (formulaire) => {
            this.formulaire = formulaire;

            this.form.patchValue({
              service: formulaire.service,
              employes: formulaire.employes,
              adjoint: formulaire.adjoint
            });
          },
          error: (error) => {
            console.error(error);
            this.errorMessage.set(error.message ?? 'Erreur');
          }
        });
      }
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