import { Injectable, Service } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HabilitationDirection } from '../../models/HabilitationDirection';

@Injectable({
    providedIn: 'root'
})
export class LienDirectionService {

    private baseUrl = environment.apiUrl + '/api/liens-direction'

    constructor(
        private readonly http: HttpClient,
        private router: Router
    ){}


    //gestion des erreurs
    private handleError(error: HttpErrorResponse): Observable<never>{
        let message = 'Une erreur est survenue';

        if (error.error instanceof ErrorEvent) {
            message = error.error.message;
        }else if(typeof error.error === 'string'){
            message = error.error.replace(/^\d+\s+[A-Z_]+\s+/i, '');
        }else if(error.error?.message){
            message = error.error.message;
        }else if(error.message){
            message = error.message
        }

        console.error('Erreur backend: ', error);
        return throwError(
            () => new Error(message)
        )
        
    }

    //1- liste des habilitations direction
    getAll(){
        return this.http.get<HabilitationDirection[]>(this.baseUrl)
        .pipe(
            catchError(
                (error: HttpErrorResponse) => {
                    return this.handleError(error)
                }
            )
        )
    }


    //2- Ajouter une habilitation direction
    add(habilitationDirection: HabilitationDirection): Observable<HabilitationDirection> {
        let api = `${this.baseUrl}/add`;
        return this.http.post<HabilitationDirection>(api, habilitationDirection)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleError(error)
                )
            );
    }


    //3- Modifier une habilitation direction
    update(habilitationDirection: HabilitationDirection): Observable<HabilitationDirection> {
        let api = `${this.baseUrl}/update/${habilitationDirection.id}`;
        return this.http.post<HabilitationDirection>(api, habilitationDirection)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleError(error)
                )
            );
    }


    //4- Recuperer une habilitation direction par son Id
    getById(id?: number){
        let api = `${this.baseUrl}/${id}`
        return this.http.get<HabilitationDirection>(api)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {
                        return this.handleError(error)
                    }
                )
            )
    }

    //5- Supprimer une habilitation direction
    delete(id?: number): Observable<void> {
        let api = `${this.baseUrl}/delete/${id}`;
        return this.http.delete(api, { responseType: 'text' as 'json' })
            .pipe(
                map(() => void 0),
                catchError((error: HttpErrorResponse) => this.handleError(error))
            );
    }


}
