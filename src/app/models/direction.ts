import { Employe } from "./employe";

export interface Direction{
    id?: number;
    service: string;
    adjoint:boolean;
    employes?: Employe;
}