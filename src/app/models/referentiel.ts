export class Referentiel {
  id?: number;
  libelle: string;
  presentation: string;
  programme: any;
  // tslint:disable-next-line:variable-name
  critere_evaluation: string;
  // tslint:disable-next-line:variable-name
  critere_admission: string;
  constructor(id: number, libelle: string, presentation: string,
              // tslint:disable-next-line:variable-name
              programme: any, critere_evaluation: string,
              // tslint:disable-next-line:variable-name
              critere_admission: string) {
    this.id = id;
    this.libelle = libelle;
    this.presentation = presentation;
    this.programme = programme;
    this.critere_evaluation = critere_evaluation;
    this.critere_admission = critere_admission;
  }
}

