import {Competence} from './competence';

export class Groupecompetence {
  id?: number;
  libelle: string;
  description: string;
  competence: Competence;
  constructor(id: number, libelle: string, description: string,
              competence: Competence) {
    this.id = id;
    this.libelle = libelle;
    this.description = description;
    this.competence = competence;
  }
}
