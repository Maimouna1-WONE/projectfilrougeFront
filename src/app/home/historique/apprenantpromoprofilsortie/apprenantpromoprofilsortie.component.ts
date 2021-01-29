import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-apprenantpromoprofilsortie',
  templateUrl: './apprenantpromoprofilsortie.component.html',
  styleUrls: ['./apprenantpromoprofilsortie.component.css']
})
export class ApprenantpromoprofilsortieComponent implements OnInit {
app: [];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
        this.app = data.apppromoprofilsortie;
        console.log(this.app);
      }
    );
  }

}
