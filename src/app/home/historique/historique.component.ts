import { Component, OnInit } from '@angular/core';
import {Promo} from '../../models/promo';
import {PromoService} from '../../services/promo.service';
import {FormControl} from '@angular/forms';
import {ProfilSortie} from '../../models/ProfilSortie';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  apppromo: Promo[];
  promos: Promo[];
  ps: Object;
  toppingsControl = new FormControl([]);
  toppingsControl1 = new FormControl([]);
  constructor(private promoservice: PromoService) { }

  ngOnInit(): void {
    this.promoservice.getAll(0)
      .subscribe(
        res => {
          this.promos = res;
        },
        error => console.log('error de recuperation promos')
      );
    this.promoservice.getProfilsortie().subscribe(
        res1 => {
          this.ps = res1;
        },
        error => console.log('error de recuperation profil de sortie')
      );
  }
}
