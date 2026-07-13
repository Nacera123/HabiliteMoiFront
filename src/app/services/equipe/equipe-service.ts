import { Injectable, Service } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Equipe } from '../../models/equipe';
import { EquipeRequest } from '../../models/EquipeRequest';

@Injectable({
    providedIn: 'root'
})
export class EquipeService {

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


    getFormData(): Observable<any> {
        let api = `${this.baseUrl}/add`
        return this.http.get<any>(api)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleError(error)
                )
            )
    }

    //2- Ajouter une equipe
    add(responsableId: number, membresIds: number[]) {
        let api = `${this.baseUrl}/add`
        return this.http.post(api, { responsableId, membresIds })
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleError(error)
                )
            )
    }


    // Récupérer le responsable + membres disponibles pour update
    getUpdateData(id: number): Observable<any> {
        let api = `${this.baseUrl}/update/${id}`
        return this.http.get<any>(api)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleError(error)
                )
            )
    }

    // Ajouter des membres à l'équipe
    update(id: number, membresIds: number[]) {
        let params = new HttpParams();
        membresIds.forEach(mid => {
            params = params.append('membresIds', mid.toString());
        });

        let api = `${this.baseUrl}/update/${id}`
        return this.http.post(api, {}, { params })
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleError(error)
                )
            )
    }



    deleteMembre(id: number) {
        let api = `${this.baseUrl}/delete/${id}`
        return this.http.delete(api, { responseType: 'text' as 'json' })
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleError(error)
                )
            )
    }


    addEquipe(equipe: EquipeRequest) {
        return this.http.post(`${this.baseUrl}/add`, equipe);
    }

    updateEquipe(id: number, equipe: EquipeRequest) {
        return this.http.post(`${this.baseUrl}/update/${id}`, equipe);
    }

    update1(id: number, membresIds: number[]) {
        const api = `${this.baseUrl}/updates/${id}`;

        return this.http.post(
            api,
            null,
            {
            params: {
                membresIds: membresIds
            }
            }
        );
    }


    getUpdateData1(id: number) {
        return this.http.get<any>(
            `${this.baseUrl}/updated/${id}`
        );
    }


    update2(id: number, membresIds: number[]) {

        return this.http.post(
            `${this.baseUrl}/updated/${id}`,
            null,
            {
            params: {
                membresIds: membresIds
            }
            }
        );

    }

}
