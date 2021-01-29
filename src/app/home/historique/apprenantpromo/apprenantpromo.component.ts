import { Component, OnInit } from '@angular/core';
import {PromoService} from '../../../services/promo.service';
import {Promo} from '../../../models/promo';
import {ActivatedRoute, Data} from '@angular/router';
import {MessageService} from 'primeng/api';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-apprenantpromo',
  templateUrl: './apprenantpromo.component.html',
  styleUrls: ['./apprenantpromo.component.css']
})
export class ApprenantpromoComponent implements OnInit {
  constructor(private promoservice: PromoService,
              private route: ActivatedRoute) {
  }

  apppromo: Promo[];
  el: Promo;
  displayedColumns = ['check', 'nom', 'prenom'];
  // @ts-ignore
  dataSource = new MatTableDataSource<Promo>(this.apppromo);

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
        this.apppromo = data.apppromo[0].groupes[0].apprenants;
      }
    );
  }
  // tslint:disable-next-line:typedef
  primaryClick(element) {
    this.el = element;
    return true;
    //console.log(this.el);
  }
}
