import { Component, OnInit } from '@angular/core';
import {ProfilService} from '../../../../services/profil.service';
import {ActivatedRoute, Data} from '@angular/router';
import {Profil} from '../../../../models/profil';

@Component({
  selector: 'app-detailprofil',
  templateUrl: './detailprofil.component.html',
  styleUrls: ['./detailprofil.component.css']
})
export class DetailprofilComponent implements OnInit {
Users: Profil[];
  colonne: string[] = ['nom', 'prenom', 'login', 'telephone', 'email', 'adresse', 'genre'];

  constructor(private profilservice: ProfilService,
              private  route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
        this.Users = data.users;
      }
    );
  }
}
