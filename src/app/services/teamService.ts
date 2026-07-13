import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Inject, Injectable, Service } from "@angular/core";
import { environment } from "../environments/environment.dev";
import { Direction } from "../models/direction";
import { catchError, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { Equipe } from "../models/equipe";
import { Poste } from "../models/poste";

@Injectable({
    providedIn: 'root'
})
export class TeamService {

    private baseUrl = environment.apiUrl + '/api/equipe'

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


    //1- liste des equipes
    getAll(){
        return this.http.get<Equipe>(this.baseUrl)
        .pipe(
            catchError(
                (error: HttpErrorResponse) => {
                    return this.handleError(error)
                }
            )
        )
    }

    //add
    getUpdate(poste: Poste): Observable<Poste>{
        let api = `${this.baseUrl}/update/${poste.id}`
        return this.http.get<Poste>(api)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {
                        return this.handleError(error)
                    }
                )
            )
    }

}