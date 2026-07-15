import { TypeHabilitation } from "./TypeHabilitation";

export interface Lienhabilitation{
    id?: number;
    outil: string;
    lien: string;
    urlHabilitation: string;
    description: string;
    typeHabilitation?: TypeHabilitation;


}