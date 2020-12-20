import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {PromoService} from '../services/promo.service';
import {Promo} from '../models/promo';
import {Referentiel} from '../models/referentiel';
import {ReferentielService} from '../services/referentiel.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {

  promos: Promo[];
  pageEvent: PageEvent;
  pageIndex: number;
  pageSize: number;
  referentiel: Referentiel;
  colonne: string[] = ['id', 'libelle', 'lieu', 'langue', 'description', 'reference_agate', 'date_debut', 'date_fin', 'referentiel', 'avatar', 'delete', 'liste'];
  public message: string;
  principal: Promo[];
  constructor(private promoservice: PromoService,
              private referentielservice: ReferentielService,
              private flashmessage: FlashMessagesService) { }

  ngOnInit(): void {
    this.promoservice.getAll(0)
      .subscribe(
        res => {
          this.promos = res;
        },
        error => console.log('error de recuperation promos')
      );
  }
  // tslint:disable-next-line:typedef
  public getServerData(event?: PageEvent) {
    this.promoservice.getAll(event.pageIndex).subscribe(
      res => {
        this.promos = res;
      },
      error => {
        console.log('error');
      }
    );
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    return event;
  }
  // tslint:disable-next-line:typedef
  detailRef(ref: Referentiel, promo: Promo) {
    this.referentielservice.getbyId(ref.id).subscribe(
      res => {
        this.referentiel = res;
      },
      error => {
        console.log(error);
      }
    );
  }
  // tslint:disable-next-line:typedef
  deletePromo(promo: Promo){
    const res = confirm('Êtes-vous sûr de vouloir supprimer?');
    if (res) {
      const paragraphe = document.getElementById('message');
      paragraphe.style.display = 'block';
      this.promoservice.deleteOnePromo(promo.id).subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        res => {
          this.flashmessage.show('Suppression reussie', {cssClass: 'alert-success', timeout: 1000});
          this.refresh();
        },
        error => {
          this.flashmessage.show(error, {cssClass: 'alert-danger', timeout: 1000});
          this.refresh();
        });
    }
  }
  // tslint:disable-next-line:typedef
  getApprenant(){
    this.promoservice.getApprenant().subscribe(
      res => {
        this.principal = res;
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }
  // tslint:disable-next-line:typedef
  refresh(){
    this.promoservice.getAll(0)
      .subscribe(
        res => {
          this.promos = res;
        },
        error => console.log('error de recuperation promos')
      );
  }
}
