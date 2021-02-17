import { Component, OnInit } from '@angular/core';
import {Promo} from '../../models/promo';
import {PromoService} from '../../services/promo.service';
import {FormControl} from '@angular/forms';
import {ProfilSortie} from '../../models/ProfilSortie';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  apppromo: Promo[];
  promos: Promo[];
  ps: Object;
  cour: Promo;
  app: [];
  groupes: [];
  detailapp: Promo;
  nbAppattente: number;
  toppingsControl = new FormControl([]);
  toppingsControl1 = new FormControl([]);
  constructor(private promoservice: PromoService) { }

  ngOnInit(): void {
    this.promoservice.getPromoencours()
      .subscribe(
        res => {
          this.promos = res;
        },
        error => {
          Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Yes'
          });
        }
      );
    this.promoservice.getProfilsortie().subscribe(
        res1 => {
          this.ps = res1;
        },
        error => {
          Swal.fire({
            title: 'Error recuperation!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Yes'
          });
        }
      );
  }
  // tslint:disable-next-line:typedef
  detail(p: Promo){
    this.promoservice.getPromobyId(p.id).subscribe(
      res => {
        this.cour = res;
        this.groupes = res['groupes'];
      },
      error => {
        Swal.fire({
          title: 'Error recuperation!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Yes'
        });
      }
    );
    this.promoservice.getApprenantAttente(p.id).subscribe(
      res => {
        this.app = res[0]['groupes'][0]['apprenants'];
        this.nbAppattente = this.app.length;
      },
      error => {
        Swal.fire({
          title: 'Error recuperation!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Yes'
        });
      }
    );
  }
  // tslint:disable-next-line:typedef
  detailApprenant(item: Promo){
    this.detailapp = item;
  }
}
