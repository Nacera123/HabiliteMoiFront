import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { Router, RouterLink } from '@angular/router';
import { Direction } from '../../../models/direction';

import { HabilitationDirection } from '../../../models/HabilitationDirection';
import { DirectionService } from '../../../services/direction/direction-service';
import { PoleService } from '../../../services/pole/pole-service';
import { LienDirectionService } from '../../../services/lienDirection/lien-direction-service';
import { LienPoleService } from '../../../services/lienPole/lien-pole-service';
import { Validate } from '../../button/validate/validate';
import { ReturnForm } from '../../button/return-form/return-form';
import { HabilitationPole } from '../../../models/HabilitationPole';
import { Pole } from '../../../models/pole';

@Component({
  selector: 'app-lien-pole-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    Validate,
    ReturnForm,
    NgSelectModule,
  ],
  templateUrl: './lien-pole-form.html',
  styleUrl: './lien-pole-form.css',
})
export class LienPoleForm implements OnInit {

  form!: FormGroup;
  errorMessage = signal<string>('');

  directions: Direction[] = [];
  poles: Pole[] = [];
  polesFiltres: Pole[] = [];

  habilitationsDirection: HabilitationDirection[] = [];
  habilitationsExistantes: HabilitationPole[] = [];

  readonly STATUT_PAR_DEFAUT = 'A demander';

  constructor(
    private directionService: DirectionService,
    private poleService: PoleService,
    private lienDirectionService: LienDirectionService,
    private lienPoleService: LienPoleService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  compareDirection(e1: Direction, e2: Direction): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  comparePole(e1: Pole, e2: Pole): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      direction: [null],
      pole: [null],
      habilitationDirectionIds: [[]],
    });

    this.directionService.getDirection().subscribe({
      next: (directions) => this.directions = directions,
      error: (error) => console.error(error)
    });

    this.poleService.getPole().subscribe({
      next: (poles) => this.poles = poles,
      error: (error) => console.error(error)
    });

  }

  onDirectionChange(direction: Direction): void {

    this.polesFiltres = this.poles.filter(p => p.direction?.id === direction?.id);
    this.form.patchValue({ pole: null });
    this.habilitationsDirection = [];
    this.form.patchValue({ habilitationDirectionIds: [] });

    if (!direction) return;

    // Récupérer les liens disponibles pour cette direction
    this.lienDirectionService.getAll().subscribe({
      next: (all) => {
        this.habilitationsDirection = all.filter(hd => hd.direction?.id === direction.id);
      },
      error: (error) => console.error(error)
    });
  }

  onPoleChange(pole: Pole): void {

    if (!pole?.id) return;

    // Précocher les habilitations déjà attribuées à ce pole
    this.lienPoleService.getAll().subscribe({
      next: (all) => {
        const existantes = all.filter(hp => hp.pole?.id === pole.id);
        const idsExistants = existantes
          .map(hp => hp.habilitationDirection?.id)
          .filter((id): id is number => id !== undefined);
        this.form.patchValue({ habilitationDirectionIds: idsExistants });
      },
      error: (error) => console.error(error)
    });
  }

  toggleHabilitation(id: number, checked: boolean): void {
    const current: number[] = this.form.value.habilitationDirectionIds ?? [];
    if (checked) {
      this.form.patchValue({ habilitationDirectionIds: [...current, id] });
    } else {
      this.form.patchValue({ habilitationDirectionIds: current.filter(i => i !== id) });
    }
  }

  isChecked(id: number): boolean {
    return (this.form.value.habilitationDirectionIds ?? []).includes(id);
  }

  create(): void {

    const pole: Pole = this.form.value.pole;
    const ids: number[] = this.form.value.habilitationDirectionIds ?? [];

    if (!pole?.id) {
      this.errorMessage.set('Veuillez choisir un pole');
      return;
    }

    this.lienPoleService.update(pole.id, ids).subscribe({
      next: () => this.onSuccess(),
      error: (error) => this.onError(error)
    });
  }

  private onSuccess(): void {
    alert('Habilitations du pole mises à jour');
    this.router.navigate(['admin/liens-habilitation-pole']);
  }

  private onError(error: any): void {
    console.error(error);
    this.errorMessage.set(error.message ?? 'Erreur');
  }

}