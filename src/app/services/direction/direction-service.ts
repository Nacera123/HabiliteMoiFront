import { Injectable, Service } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Direction } from '../../models/direction';

@Injectable({
    providedIn: 'root'
})
export class DirectionService {

      private  baseUrl = environment.apiUrl + '/api/direction';

  constructor(
    private readonly http: HttpClient,
    private router: Router
  ) {}


    //gestion des erreurs
    private handleError(error: HttpErrorResponse): Observable<never> {
        let message = 'Une erreur est survenue';

        if (error.error instanceof ErrorEvent) {
            message = error.error.message;
        } else if (typeof error.error === 'string') {
            message = error.error;
        } else if (error.error?.message) {
            message = error.error.message;
        } else if (error.message) {
            message = error.message;
        }

        console.error('Erreur backend : ', error);
        return throwError(() => new Error(message));
    }

    //1- liste des directions
    getDirection() {
    return this.http.get<Direction[]>(this.baseUrl)
        .pipe(
        catchError((error: HttpErrorResponse) => {
            return this.handleError(error);
        })
        );
    }

    //2- Recuperer une direction par son id
    getById(id?: number) {
        let api = `${this.baseUrl}/${id}`;
        return this.http.get<Direction>(api)
            .pipe(
            catchError(

                error => {
                    console.error('l\'erreur : ', error);
                    throw error;

                }
          )
            );
    }

    //3- Ajouter une direction
    add(direction: Direction) : Observable<Direction> {
    let api = `${this.baseUrl}/add`;
    return this.http.post<Direction>(api, direction)
        .pipe(
        catchError(
            (error: HttpErrorResponse) => this.handleError(error)
        )
        )
    }

  //4- Modifier une direction
    update(direction: Direction) : Observable<Direction> {
        let api = `${this.baseUrl}/update/${direction.id}`;
        return this.http.post<Direction>(api, direction)
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
