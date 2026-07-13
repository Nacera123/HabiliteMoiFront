import { Injectable, Service } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Pole } from '../../models/pole';
import { Header } from '../../components/header/header';

@Injectable({
    providedIn: 'root'
})
export class PoleService {


    private baseUrl = environment.apiUrl + '/api/pole'

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
            // message = error.error;
            message = error.error.replace(/^\d+\s+[A-Z_]+\s+/i, '');
        }else if(error.error?.message){
            message = error.error.message;
        }else if(error.message){
            message = error.message
        }

        console.error('Erreur backend: ', error);
        return throwError(
            () => new Error(message)
            // () => new Error(message)
        )
        
    }

    //1- liste des pole
    getPole(){
        return this.http.get<Pole[]>(this.baseUrl)
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
        return this.http.get<Pole>(api)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {
                        return this.handleError(error)
                    }
                )
            )
    }


    //3- Ajouter un pole
    add(pole: Pole) : Observable<Pole>{
        let api = `${this.baseUrl}/add`
        return this.http.post<Pole>(api, pole)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleError(error)
                )
            )
    }

    // 4- Modifier un pole 
    update(pole: Pole) : Observable<Pole>{
        let api = `${this.baseUrl}/update/${pole.id}`;
        return this.http.post<Pole>(api, pole)
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
