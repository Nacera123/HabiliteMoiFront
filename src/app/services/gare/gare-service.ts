import { Injectable, Service } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Gare } from '../../models/gare';

@Injectable({
    providedIn: 'root'
})
export class GareService {

        private baseUrl = environment.apiUrl + '/api/gare'

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
            message = error.error;
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

    //1- liste des pole
    getAll(){
        return this.http.get<Gare[]>(this.baseUrl)
        .pipe(
            catchError(
                (error: HttpErrorResponse) => {
                    return this.handleError(error)
                }
            )
        )
    }


    //2- Recuperer un pole par son Id
    getById(id?: number){
        let api = `${this.baseUrl}/${id}`
        return this.http.get<Gare>(api)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {
                        return this.handleError(error)
                    }
                )
            )
    }


    //3- Ajouter un pole
    add(gare: Gare) : Observable<Gare>{
        let api = `${this.baseUrl}/add`
        return this.http.post<Gare>(api, gare)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleError(error)
                )
            )
    }

    // 4- Modifier un pole 
    update(gare: Gare) : Observable<Gare>{
        let api = `${this.baseUrl}/update/${gare.id}`;
        return this.http.post<Gare>(api, gare)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleError(error)
                )
            )
    }

    // 5- Supprimer un pole
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
