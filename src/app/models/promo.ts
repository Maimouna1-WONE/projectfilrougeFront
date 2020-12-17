import {Referentiel} from './referentiel';

export class Promo {
  id?: number;
  libelle: string;
  lieu?: string;
  langue: string;
  description: string;
  // tslint:disable-next-line:variable-name
  reference_agate: string;
  // tslint:disable-next-line:variable-name
  dateDebut: any;
  // tslint:disable-next-line:variable-name
  dateFin: any;
  avatar?: any;
  referentiel?: Referentiel;
  constructor(id: number, libelle: string, lieu: string,
              // tslint:disable-next-line:variable-name
              langue: string, description: string, reference_agate: string, dateDebut: any,
              // tslint:disable-next-line:variable-name
              dateFin: any, referentiel: Referentiel, avatar: any) {
    this.id = id;
    this.libelle = libelle;
    this.lieu = lieu;
    this.langue = langue;
    this.description = description;
    this.reference_agate = reference_agate;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.referentiel = referentiel;
    this.avatar = avatar;
  }
}

