import { Direction } from "./direction";
import { Pole } from "./pole";
import { Poste } from "./poste";

export interface Equipe {
  directions: Direction[];
  poles: Pole[];
  postes: Poste[];
}