import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {ProfilSortie} from '../../../models/ProfilSortie';
import {ProfilsortieService} from '../../../services/profilsortie.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Profil} from '../../../models/profil';
// @ts-ignore
import { MdbTablePaginationComponent, MdbTableDirective } from 'PATH-TO-MDB-ANGULAR-HERE';
@Component({
  selector: 'app-profilsortie',
  templateUrl: './profilsortie.component.html',
  styleUrls: ['./profilsortie.component.css']
})
export class ProfilsortieComponent implements OnInit {
  colonne: string[] = ['libelle', 'delete'];
  pageEvent: PageEvent;
  pageIndex: number;
  pageSize: number;
  inputmodifie: string;
  profilsortie: ProfilSortie[];
  constructor(private profilsortieservice: ProfilsortieService,
              private flashmessage: FlashMessagesService) { }

  // tslint:disable-next-line:typedef
  public getServerData(event?: PageEvent){
    this.profilsortieservice.getAll(event.pageIndex).subscribe(
      res => {
        this.profilsortie = res;
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
    this.profilsortieservice.getAll(0)
      .subscribe(
        res => {
          this.profilsortie = res;
        },
        error => console.log('erreur de recuperation profils de sortie')
      );
  }
// tslint:disable-next-line:typedef
delete(ps: ProfilSortie){
  const res = confirm('Êtes-vous sûr de vouloir supprimer?');
  if (res) {
    this.profilsortieservice.deleteOneProfilsortie(ps.id).subscribe(
      res => {
        this.flashmessage.show('Suppression reussie', {cssClass: 'alert-success', timeout: 1000});
      },
      error => {
        this.flashmessage.show('Echec suppression', {cssClass: 'alert-danger', timeout: 1000});
      });
  }
}
  // tslint:disable-next-line:typedef
  update(ps: ProfilSortie) {
    this.inputmodifie = document.getElementById('td' + ps.id).textContent;
    const prof = new Profil(ps.id, this.inputmodifie);
    this.profilsortieservice.updateOneProfilsortie(ps.id, prof).subscribe(
      res => {
        this.flashmessage.show('Modification reussie', {cssClass: 'alert-success', timeout: 1000});
      },
      error => {
        this.flashmessage.show('Echec', {cssClass: 'alert-danger', timeout: 1000});
      }
    );
  }
}
