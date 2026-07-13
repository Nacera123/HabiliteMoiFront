import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Poste } from '../../../models/poste';
import { Employe } from '../../../models/employe';
import { Direction } from '../../../models/direction';
import { Pole } from '../../../models/pole';
import { PosteService } from '../../../services/poste/poste-service';
import { EmployeService } from '../../../services/employe/employe-service';
import { DirectionService } from '../../../services/direction/direction-service';
import { PoleService } from '../../../services/pole/pole-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { Validate } from '../../button/validate/validate';
import { ReturnForm } from '../../button/return-form/return-form';

@Component({
  selector: 'app-poste-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    NgSelectModule,
    RouterLink,
    Validate,
    ReturnForm,
  ],
  templateUrl: './poste-form.html',
  styleUrl: './poste-form.css',
})
export class PosteForm implements OnInit {

  form!: FormGroup;
  formulaire!: Poste;
  errorMessage = signal<string>('');
  employes: Employe[] = [];
  direction: Direction[] = [];
  pole: Pole[] = [];
  polesFiltres: Pole[] = [];

  constructor(
    private posteService: PosteService,
    private employeService: EmployeService,
    private directionService: DirectionService,
    private poleservice: PoleService,
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
  comparePole(e1: Pole, e2: Pole): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  ngOnInit(): void {

  this.form = this.fb.group({
    intitule: ['', Validators.required],
    pole: [null],
    direction: [null],
    employes: [null],
    adjoint: [false],
  });


  // filtre des poles en fonction de la direction
  this.form.get('direction')?.valueChanges.subscribe((direction: Direction | null) => {

    if (!direction) {
      this.polesFiltres = this.pole;
    } else {
      this.polesFiltres = this.pole.filter(
        p => p.direction?.id === direction.id
      );
    }

    // Réinitialise le pôle sélectionné
    this.form.patchValue({ pole: null }, { emitEvent: false });

  });

  this.activatedRoute.params.subscribe(params => {

    const id = params['id'];

    this.employeService.getEmployes().subscribe({
      next: (employes) => {

        this.employes = employes;

        this.directionService.getDirection().subscribe({
          next: (directions) => {

            this.direction = directions;
            
            this.poleservice.getPole().subscribe({
              next: (pole) => {

                this.pole = pole;
                this.polesFiltres = pole;

                if (id) {
    
                  this.posteService.getById(id).subscribe({
                    next: (formulaire) => {
    
                      this.formulaire = formulaire;
    
                      const employe = this.employes.find(
                        e => e.id === formulaire.employes?.id
                      );
    
                      const direction = this.direction.find(
                        d => d.id === formulaire.direction?.id
                      );
                      const pole = this.pole.find(
                        d => d.id === formulaire.pole?.id
                      );
    
                      this.form.patchValue({
                        intitule: formulaire.intitule,
                        employes: employe ?? null,
                        direction: direction ?? null,
                        pole: pole ?? null,
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
              
            })

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

    const poste: Poste = {
      intitule: this.form.value.intitule,
      adjoint: this.form.value.adjoint,
      direction: this.form.value.direction,
      employes: this.form.value.employes,
      pole: this.form.value.pole
    };

    const request = this.formulaire?.id
      ? this.posteService.update({ id: this.formulaire.id, ...poste })
      : this.posteService.add(poste);

    request.subscribe({
      next: () => {
        alert(this.formulaire ? 'Poste modifié' : 'Poste ajouté');
        this.router.navigate(['admin/poste']);
      },
      error: (error) => {
        console.error(error);
        this.errorMessage.set(error.message ?? 'Erreur');
      }
    });
  }

}
