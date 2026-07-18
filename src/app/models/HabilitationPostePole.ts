import { HabilitationPole } from "./HabilitationPole";
import { Poste } from "./poste";
import { StatutHabilitation } from "./StatutHabilitation";

export interface HabilitationPostePole{
    id?: number;

    habilitationPole?: HabilitationPole
    poste?: Poste
    statutHabilitation?: string;


}