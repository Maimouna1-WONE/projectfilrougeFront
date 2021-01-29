import {Niveau} from './niveau';

export class Competence {
  id?: number;
  libelle: string;
  description: string;
  niveau: Niveau[];
  constructor(id: number, libelle: string, description: string, niveau: Niveau[]) {
    this.id = id;
    this.libelle = libelle;
    this.description = description;
    this.niveau = niveau;
  }
}
