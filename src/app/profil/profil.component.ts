import {Component, Input, OnInit} from '@angular/core';
import {ProfilService} from '../services/profil.service';
import {Profil} from '../models/profil';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import { FlashMessagesService} from 'angular2-flash-messages';

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
  profils = [];
  usersprofil = [];
  oneprofil = Profil;
  public inputmodifie: string;
  message: string;
  colonne: string[] = ['libelle', 'liste', 'update', 'delete'];
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
  update(profil: Profil) {
    const prof = new Profil(profil.id, this.inputmodifie);
    this.profilservice.updateOneProfil(profil.id, prof).subscribe(
      res => {
        this.flashmessage.show('Modification reussie', {cssClass: 'alert-success', timeout: 1000});
        this.refresh();
      },
      error => {
        this.flashmessage.show('Echec modification', {cssClass: 'alert-danger', timeout: 1000});
      }
    );
  }
  // tslint:disable-next-line:typedef
  editProfil(profil: Profil){
    const input = document.getElementById('input' + profil.id);
    const label = document.getElementById('label');
    const btn = document.getElementById('btn' + profil.id);
    input.style.display = 'block';
    label.style.display = 'block';
  }
  // tslint:disable-next-line:typedef
  deleteprofil(profil: Profil) {
    const res = confirm('Êtes-vous sûr de vouloir supprimer?');
    if (res) {
      const paragraphe = document.getElementById('message');
      paragraphe.style.display = 'block';
      this.profilservice.deleteOneProfil(profil.id).subscribe(
        res => {
          this.flashmessage.show('Suppression reussie', {cssClass: 'alert-success', timeout: 1000});
          this.refresh();
        },
        error => {
          this.flashmessage.show('Echec suppression', {cssClass: 'alert-danger', timeout: 1000});
          this.message = 'error delete';
        });
    }
  }
  // tslint:disable-next-line:typedef
  refresh(){
    this.profilservice.getAllprofils(0)
      .subscribe(
        res => {
          this.profils = res;
        },
        error => console.log('erreur de recuperation profils')
      );
  }
}
