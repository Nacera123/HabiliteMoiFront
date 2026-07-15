import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { Lienhabilitation } from '../../../models/lienhabilitation';
import { TypeHabilitation } from '../../../models/TypeHabilitation';
import { TypehabilitationService } from '../../../services/typeHabilitation/typehabilitation-service';
import { LienhabilitationService } from '../../../services/lienHabilitation/lienhabilitation-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReturnForm } from '../../button/return-form/return-form';
import { Validate } from '../../button/validate/validate';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-lien-habilitation-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterLink,
    Validate,
    ReturnForm,
    NgSelectModule,
  ],
  templateUrl: './lien-habilitation-form.html',
  styleUrl: './lien-habilitation-form.css',
})
export class LienHabilitationForm implements OnInit {

  form!: FormGroup;
  formulaire!: Lienhabilitation;
  errorMessage = signal<string>('');
  typeHabilitation: TypeHabilitation[] = [];
  typeHabilitationOptions: TypeHabilitation[] = [];

  readonly NOUVEAU_TYPE = '__new__';

  constructor(
    private typeHabilitationService: TypehabilitationService,
    private lienHabilitationService: LienhabilitationService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  compareType(e1: TypeHabilitation, e2: TypeHabilitation): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      outil: [null],
      lien: [null],
      urlHabilitation: [null],
      description: [null],
      typeHabilitation: [null],
      nouveauType: [null],
    });

    this.activatedRoute.params.subscribe(params => {

      const id = params['id'];

      this.typeHabilitationService.getAll().subscribe({
        next: (typeHabilitation) => {

          this.typeHabilitation = typeHabilitation;
          this.typeHabilitationOptions = [
            ...typeHabilitation,
            { id: this.NOUVEAU_TYPE, type: '+ Créer un nouveau type' } as unknown as TypeHabilitation
          ];

          if (id) {

            this.lienHabilitationService.getById(id).subscribe({
              next: (formulaire) => {

                this.formulaire = formulaire;

                const typeHabilitation = this.typeHabilitation.find(
                  e => e.id === formulaire.typeHabilitation?.id
                );

                this.form.patchValue({
                  outil: formulaire.outil,
                  lien: formulaire.lien,
                  urlHabilitation: formulaire.urlHabilitation,
                  description: formulaire.description,
                  typeHabilitation: typeHabilitation ?? null,
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

  create(): void {

    const selectedType = this.form.value.typeHabilitation;
    const nouveauTypeLibelle = this.form.value.nouveauType;
    const isNouveauType = selectedType?.id === this.NOUVEAU_TYPE;

    if (isNouveauType && nouveauTypeLibelle) {
      this.typeHabilitationService.add({ type: nouveauTypeLibelle } as TypeHabilitation)
        .pipe(
          switchMap((typeCree: TypeHabilitation) => {
            return this.saveLien(typeCree);
          })
        )
        .subscribe({
          next: () => this.onSuccess(),
          error: (error) => this.onError(error)
        });
      return;
    }

    const typeAEnvoyer = isNouveauType ? null : selectedType;

    this.saveLien(typeAEnvoyer).subscribe({
      next: () => this.onSuccess(),
      error: (error) => this.onError(error)
    });
  }

  private saveLien(typeHabilitation: TypeHabilitation | null) {

    const lienHabilitation: Lienhabilitation = {
      outil: this.form.value.outil,
      lien: this.form.value.lien,
      urlHabilitation: this.form.value.urlHabilitation,
      description: this.form.value.description,
      typeHabilitation: typeHabilitation ?? undefined,
    };

    return this.formulaire?.id
      ? this.lienHabilitationService.update({ id: this.formulaire.id, ...lienHabilitation })
      : this.lienHabilitationService.add(lienHabilitation);
  }

  private onSuccess(): void {
    alert(this.formulaire ? 'Lien modifié' : 'Lien ajouté');
    this.router.navigate(['admin/liens-habilitation']);
  }

  private onError(error: any): void {
    console.error(error);
    this.errorMessage.set(error.message ?? 'Erreur');
  }

}