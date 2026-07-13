import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employe } from '../../models/employe';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private  baseUrl = environment.apiUrl + '/api/employes';

  constructor(
    private readonly http: HttpClient,
    private router: Router
  ) {}



    private handleError(error: HttpErrorResponse): Observable<never> {
        let message = 'Une erreur est survenue';

        if (error.error instanceof ErrorEvent) {
            message = error.error.message;
        } else if (typeof error.error === 'string') {
            message = error.error.replace(/^\d+\s+[A-Z_]+\s+/i, '');
        } else if (error.error?.message) {
            message = error.error.message;
        } else if (error.message) {
            message = error.message;
        }

        console.error('Erreur backend : ', error);
        return throwError(() => new Error(message));
    }

  
  //1- liste des employes
  getEmployes() {
    return this.http.get<Employe[]>(this.baseUrl)
      .pipe(
        catchError((error: HttpErrorResponse) => {
            return this.handleError(error);
        })
      );
  }

  //2- Recuperer un employe par son id
  getEmployeById(id?: number) {
    let api = `${this.baseUrl}/${id}`;
    return this.http.get<Employe>(api)
        .pipe(
        catchError(
            // (error )=> {
            // console.error(error);
            // return throwError(() => error);
                                error => {
                        console.error('l\'erreur : ', error);
                        throw error;

                    }

        // }
      )
        );
  }

  //3- Ajouter un employe
  add(employe: Employe) : Observable<Employe> {
    let api = `${this.baseUrl}/add`;
    return this.http.post<Employe>(api, employe)
      .pipe(
        catchError(
          (error: HttpErrorResponse) => this.handleError(error)
        )
      )
  }

  //4- Modifier un employe
  update(employe: Employe) : Observable<Employe> {
    let api = `${this.baseUrl}/update/${employe.id}`;
    return this.http.post<Employe>(api, employe)
      .pipe(
        catchError(
          (error: HttpErrorResponse) => this.handleError(error)
        )
      )
  }

  //5- Supprimer un employe
  delete(id?: number): Observable<void> {
    let api = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(api, { responseType: 'text' as 'json' })
      .pipe(
        map(() => void 0),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }
}