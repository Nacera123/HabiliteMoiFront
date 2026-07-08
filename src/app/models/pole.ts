import { Direction } from "./direction";
import { Employe } from "./employe";

export interface Pole{
    id?: number;
    nom: string;
    adjoint:boolean;
    employes: Employe;
    direction: Direction
}