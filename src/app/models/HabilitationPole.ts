import { HabilitationDirection } from "./HabilitationDirection";
import { Pole } from "./pole";
import { StatutHabilitation } from "./StatutHabilitation";


export interface HabilitationPole{
    id?: number;

    habilitationDirection?: HabilitationDirection
    pole?: Pole

    statutHabilitation?: string;
    // statutHabilitation?: StatutHabilitation


}