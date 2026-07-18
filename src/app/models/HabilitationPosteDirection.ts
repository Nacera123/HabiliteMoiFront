import { HabilitationDirection } from "./HabilitationDirection";
import { Poste } from "./poste";
import { StatutHabilitation } from "./StatutHabilitation";

export interface HabilitationPosteDirection{
    id?: number;

    habilitationDirection?: HabilitationDirection
    poste?: Poste
    statutHabilitation?: string;


}