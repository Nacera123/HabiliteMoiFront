import { Injectable, Service } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HabilitationPole } from '../../models/HabilitationPole';


@Injectable({
    providedIn: 'root'
})
export class LienPoleService {

        private baseUrl = environment.apiUrl + '/api/liens-pole'

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

    //1- liste des habilitations pole
    getAll(){
        return this.http.get<HabilitationPole[]>(this.baseUrl)
        .pipe(
            catchError(
                (error: HttpErrorResponse) => {
                    return this.handleError(error)
                }
            )
        )
    }


    //2- Ajouter un ensemble d'habilitations pole (cases cochées)
    add(habilitationPoles: HabilitationPole[]): Observable<HabilitationPole[]> {
        let api = `${this.baseUrl}/add`;
        return this.http.post<HabilitationPole[]>(api, habilitationPoles)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleError(error)
                )
            );
    }


    //3- Synchroniser les habilitations d'un pole (ajout/suppression selon cases cochées)
    update(poleId: number, habilitationDirectionIds: number[]): Observable<HabilitationPole[]> {
        let api = `${this.baseUrl}/update/${poleId}`;
        return this.http.post<HabilitationPole[]>(api, habilitationDirectionIds)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleError(error)
                )
            );
    }


    //3- Modifier une habilitation pole
    update1(habilitationPole: HabilitationPole): Observable<HabilitationPole> {
        let api = `${this.baseUrl}/update/pole/${habilitationPole.id}`;
        return this.http.post<HabilitationPole>(api, habilitationPole)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleError(error)
                )
            );
    }

    

    //4- Recuperer une habilitation pole par son Id
    getById(id?: number){
        let api = `${this.baseUrl}/${id}`
        return this.http.get<HabilitationPole>(api)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {
                        return this.handleError(error)
                    }
                )
            )
    }


    //5- Supprimer une habilitation pole
    delete(id?: number): Observable<void> {
        let api = `${this.baseUrl}/delete/${id}`;
        return this.http.delete(api, { responseType: 'text' as 'json' })
            .pipe(
                map(() => void 0),
                catchError((error: HttpErrorResponse) => this.handleError(error))
            );
    }
}
