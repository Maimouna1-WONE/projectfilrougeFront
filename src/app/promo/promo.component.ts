import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {PromoService} from '../services/promo.service';
import {Promo} from '../models/promo';
import {Referentiel} from '../models/referentiel';
import {ReferentielService} from '../services/referentiel.service';
import {Router} from '@angular/router';

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
  colonne: string[] = ['id', 'libelle', 'lieu', 'langue', 'description', 'reference_agate', 'date_debut', 'date_fin', 'referentiel', 'avatar', 'delete'];
  private message: string;

  constructor(private promoservice: PromoService, private referentielservice: ReferentielService, private router: Router) { }

  ngOnInit(): void {
    this.promoservice.getAll(0)
      .subscribe(
        res => {
          this.promos = res;
          console.log(res[0].dateDebut);
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
    //const div = document.getElementById('deter' + promo.id);
    //console.log(div);
    //div.style.display = 'block';
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
          this.router.navigate(['promo']);
          this.message = 'delete ok';
        },
        error => {
          this.message = 'error delete';
        });
    }
  }
}
