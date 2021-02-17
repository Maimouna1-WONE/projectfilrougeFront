import {Niveau} from './niveau';
import {Groupecompetence} from './groupecompetence';

export class Competence {
  id?: number;
  libelle: string;
  description: string;
  niveau: Niveau[];
  groupeCompetences: Groupecompetence[];
  constructor(id: number, libelle: string, description: string,
              niveau: Niveau[], groupeCompetences: Groupecompetence[]) {
    this.id = id;
    this.libelle = libelle;
    this.description = description;
    this.niveau = niveau;
    this.groupeCompetences = groupeCompetences;
  }
}
