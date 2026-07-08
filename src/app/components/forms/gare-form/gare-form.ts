import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Gare } from '../../../models/gare';
import { GareService } from '../../../services/gare/gare-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gare-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gare-form.html',
  styleUrl: './gare-form.css',
})
export class GareForm implements OnInit {

//formGroupe!: FormGroup
  form!: FormGroup
  formulaire!: Gare
  errorMessage = signal<string>('');

  constructor(
    private gareService: GareService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    //this.formGroupe = this.fb.group({
    this.form = this.fb.group({
      nom: ['', Validators.required],

    });

    this.activatedRoute.params
      .subscribe(
        params => {
          const id = params['id'];
          if (id) {
            this.gareService.getById(id).subscribe(
              formulaire => {
                this.formulaire = formulaire
                this.form.patchValue({
                  nom: formulaire.nom,
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
      this.gareService.update({ id: this.formulaire.id, ...formulaire })
        .subscribe({
          next: () => {
            alert('La gare a bien été mise à jour');
            this.router.navigate(['admin/gare']);
          },
          error: onError
        });
    } else {
      this.gareService.add(formulaire)
        .subscribe({
          next: () => {
            alert("la gare a bien ete ajoutée");
            this.router.navigate(['admin/gare']);
          },
          error: onError
        });
    }
  }
}
