import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {Promo} from '../../../models/promo';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-apprenantprofilsortiepromo',
  templateUrl: './apprenantprofilsortiepromo.component.html',
  styleUrls: ['./apprenantprofilsortiepromo.component.css']
})
export class ApprenantprofilsortiepromoComponent implements OnInit {
app: Promo[];
  toppingsControl = new FormControl([]);
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
        this.app = data.appprofilsortie;
      }
    );
  }

}
