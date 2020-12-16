import {Profil} from './profil';

export class User {
  id?: number;
  login: string;
  password?: string;
  prenom: string;
  nom: string;
  adresse: string;
  telephone: string;
  email: string;
  avatar?: any;
  token?: string;
  profil?: Profil;
  constructor(id: number, login: string, password: string,
              prenom: string, nom: string, adresse: string, genre: string,
              telephone: string, email: string, profil: Profil, avatar: any) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.prenom = prenom;
    this.nom = nom;
    this.adresse = adresse;
    this.telephone = telephone;
    this.email = email;
    this.profil = profil;
    this.avatar = avatar;
  }
}

