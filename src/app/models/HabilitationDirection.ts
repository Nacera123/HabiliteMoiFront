import { Direction } from "./direction";
import { Lienhabilitation } from "./lienhabilitation";
import { StatutHabilitation } from "./StatutHabilitation";

export interface HabilitationDirection{
    id?: number;

    lienHabilitation?: Lienhabilitation
    direction?: Direction
    // statutHabilitation?: StatutHabilitation
    statutHabilitation?: string;


}