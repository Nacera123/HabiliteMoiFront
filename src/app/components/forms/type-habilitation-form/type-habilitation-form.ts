import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Validate } from '../../button/validate/validate';
import { ReturnForm } from '../../button/return-form/return-form';
import { TypeHabilitation } from '../../../models/TypeHabilitation';
import { TypehabilitationService } from '../../../services/typeHabilitation/typehabilitation-service';

@Component({
  selector: 'app-type-habilitation-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterLink,
    Validate,
    ReturnForm,   
  ],
  templateUrl: './type-habilitation-form.html',
  styleUrl: './type-habilitation-form.css',
})
export class TypeHabilitationForm implements OnInit{

  //formGroupe!: FormGroup
  form!: FormGroup
  formulaire!: TypeHabilitation
  errorMessage = signal<string>('');

  constructor(
    private typeHabilitationService: TypehabilitationService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    //this.formGroupe = this.fb.group({
    this.form = this.fb.group({
      type: ['', Validators.required],
    });

    this.activatedRoute.params
      .subscribe(
        params => {
          const id = params['id'];
          if (id) {
            this.typeHabilitationService.getById(id).subscribe(
              formulaire => {
                this.formulaire = formulaire
                this.form.patchValue({
                  type: formulaire.type,
                })
              },
              error => {
                console.log(error);
                this.errorMessage = error;
              }
            )
          }
        }
      )
  }



  create(): void {
    const formulaire = this.form.value;
    const onError = (error: Error) => {
      console.log(error);
      this.errorMessage.set(error.message);
    };

    if (this.formulaire && this.formulaire.id) {
      this.typeHabilitationService.update({ id: this.formulaire.id, ...formulaire })
        .subscribe({
          next: () => {
            alert('Le nom a bien été mis à jour');
            this.router.navigate(['admin/type-habilitation']);
          },
          error: onError
        });
    } else {
      this.typeHabilitationService.add(formulaire)
        .subscribe({
          next: () => {
            alert("le nom a bien ete ajouté");
            this.router.navigate(['admin/type-habilitation']);
          },
          error: onError
        });
    }
  }
}
