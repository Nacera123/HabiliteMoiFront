import { Direction } from "./direction";
import { Employe } from "./employe";
import { Pole } from "./pole";

export interface Poste{
    id?: number;
    intitule: string;
    adjoint:boolean;
    employes?: Employe | null;
    direction: Direction;
    pole: Pole
    responsable?: Poste | null;
    membres?: Poste[];
}


