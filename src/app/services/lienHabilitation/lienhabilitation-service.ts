import { Injectable, Service } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Lienhabilitation } from '../../models/lienhabilitation';

@Injectable({
    providedIn: 'root'
})
export class LienhabilitationService {

    
    private baseUrl = environment.apiUrl + '/api/liens'

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


    //1- liste des liens d'habilitations
    getAll(){
        return this.http.get<Lienhabilitation[]>(this.baseUrl)
        .pipe(
            catchError(
                (error: HttpErrorResponse) => {
                    return this.handleError(error)
                }
            )
        )
    }


    //2- Recuperer un lien d'habilitation par son Id
    getById(id?: number){
        let api = `${this.baseUrl}/${id}`
        return this.http.get<Lienhabilitation>(api)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {
                        return this.handleError(error)
                    }
                )
            )
    }

    //3- Ajouter un lien d'habilitation
    add(lien: Lienhabilitation) : Observable<Lienhabilitation>{
        let api = `${this.baseUrl}/add`
        return this.http.post<Lienhabilitation>(api, lien)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleError(error)
                )
            )
    }


    // 4- Modifier un lien d'habilitation 
    update(lien: Lienhabilitation) : Observable<Lienhabilitation>{
        let api = `${this.baseUrl}/update/${lien.id}`;
        return this.http.post<Lienhabilitation>(api, lien)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleError(error)
                )
            )
    }


    // 5- Supprimer un ien d'habilitation 
    delete(id?: number): Observable<void>{
        let api = `${this.baseUrl}/delete/${id}`;
        return this.http.delete(api, {responseType: 'text' as 'json'})
            .pipe(
                map(() => void 0),
                catchError(
                    (error: HttpErrorResponse) => this.handleError(error)
                )
            )
    }


}
