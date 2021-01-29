import {Component, OnInit} from '@angular/core';
import {ProfilService} from '../../../services/profil.service';
import {Profil} from '../../../models/profil';
import {PageEvent} from '@angular/material/paginator';
import { FlashMessagesService} from 'angular2-flash-messages';
import {ProfilSortie} from '../../../models/ProfilSortie';

// tslint:disable-next-line:no-unused-expression label-position
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  constructor(private profilservice: ProfilService, private flashmessage: FlashMessagesService) {
  }
  libelle: string;
  page = 1;
  count = 0;
  profils: Profil[];
  usersprofil = [];
  oneprofil = Profil;
  public inputmodifie: string;
  message: string;
  colonne: string[] = ['libelle', 'liste', 'delete'];
  colonneliste: string[] = ['#', 'nom', 'prenom', 'login', 'avatar'];
  pageEvent: PageEvent;
  pageIndex: number;
  pageSize: number;

  // tslint:disable-next-line:typedef
  public getServerData(event?: PageEvent){
    this.profilservice.getAllprofils(event.pageIndex).subscribe(
      res => {
        this.profils = res;
      },
      error => {
        console.log(error);
      }
    );
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    return event;
  }
  ngOnInit(): void {
    this.profilservice.getAllprofils(0)
      .subscribe(
        res => {
          this.profils = res;
        },
        error => console.log('erreur de recuperation profils')
      );
  }

  // tslint:disable-next-line:typedef
  getUsersByProfil(profil: Profil) {
    // @ts-ignore
    const liste = document.getElementById('liste');
    liste.style.display = 'block';
    this.libelle = profil.libelle;
    this.profilservice.getUsersProfil(profil.id).subscribe(
      res => {
        this.usersprofil = res['users'];
      },
      error => console.log('erreur de recuperation users by profil'),
      () => console.log('complete')
    );
  }
  // tslint:disable-next-line:typedef
  delete(ps: ProfilSortie){
    const res = confirm('Êtes-vous sûr de vouloir supprimer?');
    if (res) {
      this.profilservice.deleteOneProfil(ps.id).subscribe(
        res => {
          this.flashmessage.show('Suppression reussie', {cssClass: 'alert-success', timeout: 1000});
        },
        error => {
          this.flashmessage.show('Echec suppression', {cssClass: 'alert-danger', timeout: 1000});
        });
    }
  }
  // tslint:disable-next-line:typedef
  update(profil: Profil) {
    this.inputmodifie = document.getElementById('td' + profil.id).textContent;
    const prof = new Profil(profil.id, this.inputmodifie);
    this.profilservice.updateOneProfil(profil.id, prof).subscribe(
      res => {
        this.flashmessage.show('Modification reussie', {cssClass: 'alert-success', timeout: 1000});
      },
      error => {
        this.flashmessage.show('Echec', {cssClass: 'alert-danger', timeout: 1000});
      }
    );
  }
}
