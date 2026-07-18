import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';
import { Lienhabilitation } from '../../../models/lienhabilitation';
import { TypeHabilitation } from '../../../models/TypeHabilitation';
import { HabilitationDirection } from '../../../models/HabilitationDirection';
import { TypehabilitationService } from '../../../services/typeHabilitation/typehabilitation-service';
import { LienhabilitationService } from '../../../services/lienHabilitation/lienhabilitation-service';
import { LienDirectionService } from '../../../services/lienDirection/lien-direction-service';
import { DirectionService } from '../../../services/direction/direction-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { Direction } from '../../../models/direction';
import { Validate } from '../../button/validate/validate';
import { ReturnForm } from '../../button/return-form/return-form';

@Component({
  selector: 'app-lien-direction-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterLink,
    Validate,
    ReturnForm,
    NgSelectModule,
  ],
  templateUrl: './lien-direction-form.html',
  styleUrl: './lien-direction-form.css',
})
export class LienDirectionForm implements OnInit {

  form!: FormGroup;
  formulaire!: HabilitationDirection;
  errorMessage = signal<string>('');

  typeHabilitation: TypeHabilitation[] = [];
  typeHabilitationOptions: TypeHabilitation[] = [];

  directions: Direction[] = [];

  readonly NOUVEAU_TYPE = '__new__';
  readonly STATUT_PAR_DEFAUT = 'A demander';

  constructor(
    private typeHabilitationService: TypehabilitationService,
    private lienHabilitationService: LienhabilitationService,
    private lienDirectionService: LienDirectionService,
    private directionService: DirectionService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  compareType(e1: TypeHabilitation, e2: TypeHabilitation): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  compareDirection(e1: Direction, e2: Direction): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      outil: [null],
      lien: [null],
      urlHabilitation: [null],
      description: [null],
      typeHabilitation: [null],
      direction: [null],
      nouveauType: [null],
    });

    this.typeHabilitationService.getAll().subscribe({
      next: (typeHabilitation) => {
        this.typeHabilitation = typeHabilitation;
        this.typeHabilitationOptions = [
          ...typeHabilitation,
          { id: this.NOUVEAU_TYPE, type: '+ Créer un nouveau type' } as unknown as TypeHabilitation
        ];
      },
      error: (error) => console.error(error)
    });

    this.directionService.getDirection().subscribe({
      next: (directions) => this.directions = directions,
      error: (error) => console.error(error)
    });

  }

  create(): void {

    const selectedType = this.form.value.typeHabilitation;
    const nouveauTypeLibelle = this.form.value.nouveauType;
    const isNouveauType = selectedType?.id === this.NOUVEAU_TYPE;

    if (isNouveauType && nouveauTypeLibelle) {
      this.typeHabilitationService.add({ type: nouveauTypeLibelle } as TypeHabilitation)
        .pipe(
          switchMap((typeCree: TypeHabilitation) => this.creerLien(typeCree)),
          switchMap((lienCree: Lienhabilitation) => this.creerHabilitationDirection(lienCree))
        )
        .subscribe({
          next: () => this.onSuccess(),
          error: (error) => this.onError(error)
        });
      return;
    }

    const typeAEnvoyer = isNouveauType ? null : selectedType;

    this.creerLien(typeAEnvoyer)
      .pipe(
        switchMap((lienCree: Lienhabilitation) => this.creerHabilitationDirection(lienCree))
      )
      .subscribe({
        next: () => this.onSuccess(),
        error: (error) => this.onError(error)
      });
  }

  private creerLien(typeHabilitation: TypeHabilitation | null) {

    const lienHabilitation: Lienhabilitation = {
      outil: this.form.value.outil,
      lien: this.form.value.lien,
      urlHabilitation: this.form.value.urlHabilitation,
      description: this.form.value.description,
      typeHabilitation: typeHabilitation ?? undefined,
    };

    return this.lienHabilitationService.add(lienHabilitation);
  }

  private creerHabilitationDirection(lienCree: Lienhabilitation) {

    const habilitationDirection: HabilitationDirection = {
      lienHabilitation: lienCree,
      direction: this.form.value.direction,
      statutHabilitation: this.STATUT_PAR_DEFAUT as any,
    };

    return this.lienDirectionService.add(habilitationDirection);
  }

  private onSuccess(): void {
    alert('Habilitation direction ajoutée');
    this.router.navigate(['admin/liens-habilitation-direction']);
  }

  private onError(error: any): void {
    console.error(error);
    this.errorMessage.set(error.message ?? 'Erreur');
  }

}