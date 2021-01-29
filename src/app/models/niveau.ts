import {Competence} from './competence';

export class Niveau {
  id?: number;
  libelle: string;
  // tslint:disable-next-line:variable-name
  critereEvaluation: string;
  action: string;
  constructor(id: number, libelle: string,
              // tslint:disable-next-line:variable-name
              critereEvaluation: string, action: string) {
    this.id = id;
    this.libelle = libelle;
    this.critereEvaluation = critereEvaluation;
    this.action = action;
  }
}
