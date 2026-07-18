import { Injectable, Service } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HabilitationPosteDirection } from '../../models/HabilitationPosteDirection';

@Injectable({
    providedIn: 'root'
})
export class LienPosteDirectionService {

    private baseUrl = environment.apiUrl + '/api/liens-poste-direction'

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


    //1- liste des habilitations poste-direction
    getAll(){
        return this.http.get<HabilitationPosteDirection[]>(this.baseUrl)
        .pipe(
            catchError(
                (error: HttpErrorResponse) => {
                    return this.handleError(error)
                }
            )
        )
    }


    //2- Ajouter une habilitation poste-direction
    add(habilitationPosteDirection: HabilitationPosteDirection[]): Observable<HabilitationPosteDirection[]> {
        let api = `${this.baseUrl}/add`;
        return this.http.post<HabilitationPosteDirection[]>(api, habilitationPosteDirection)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleError(error)
                )
            );
    }


    //3- Modifier une habilitation poste-direction
    update1(habilitationPosteDirection: HabilitationPosteDirection): Observable<HabilitationPosteDirection> {
        let api = `${this.baseUrl}/update/pose-dir/${habilitationPosteDirection.id}`;
        return this.http.post<HabilitationPosteDirection>(api, habilitationPosteDirection)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleError(error)
                )
            );
    }

    //3-bis- Synchroniser les habilitations d'un poste direction (ajout/suppression selon cases cochées)
    update(posteId: number, habilitationPosteDirectionId: number[]): Observable<HabilitationPosteDirection[]> {
        let api = `${this.baseUrl}/update/${posteId}`;
        return this.http.post<HabilitationPosteDirection[]>(api, habilitationPosteDirectionId)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleError(error)
                )
            );
    }
    


    //4- Recuperer une habilitation poste-direction par son Id
    getById(id?: number){
        let api = `${this.baseUrl}/${id}`
        return this.http.get<HabilitationPosteDirection>(api)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {
                        return this.handleError(error)
                    }
                )
            )
    }


    //5- Supprimer une habilitation poste-direction 
    delete(id?: number): Observable<void> {
        let api = `${this.baseUrl}/delete/${id}`;
        return this.http.delete(api, { responseType: 'text' as 'json' })
            .pipe(
                map(() => void 0),
                catchError((error: HttpErrorResponse) => this.handleError(error))
            );
    }

}
