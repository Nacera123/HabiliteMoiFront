import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeService } from '../../../services/employe/employe-service';
import { Employe } from '../../../models/employe';
import { Validate } from '../../button/validate/validate';
import { ReturnForm } from '../../button/return-form/return-form';

@Component({
  selector: 'app-employe-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterLink,
    Validate,
    ReturnForm,
  ],
  templateUrl: './employe-form.html',
  styleUrl: './employe-form.css',
})
export class EmployeForm implements OnInit {

//formGroupe!: FormGroup
  form!: FormGroup
  formulaire!: Employe
  errorMessage = signal<string>('');

  constructor(
    private employeService: EmployeService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    //this.formGroupe = this.fb.group({
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      tel: [''],
    });

    this.activatedRoute.params
      .subscribe(
        params => {
          const id = params['id'];
          if (id) {
            this.employeService.getEmployeById(id).subscribe(
              formulaire => {
                this.formulaire = formulaire
                this.form.patchValue({
                  nom: formulaire.nom,
                  prenom: formulaire.prenom,
                  email: formulaire.email,
                  tel: formulaire.tel,
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
      this.employeService.update({ id: this.formulaire.id, ...formulaire })
        .subscribe({
          next: () => {
            alert('Le nom a bien été mis à jour');
            this.router.navigate(['admin/employes']);
          },
          error: onError
        });
    } else {
      this.employeService.add(formulaire)
        .subscribe({
          next: () => {
            alert("le nom a bien ete ajouté");
            this.router.navigate(['admin/employes']);
          },
          error: onError
        });
    }
  }
}
