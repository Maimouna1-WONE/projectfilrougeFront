import {Component, Input, OnInit} from '@angular/core';
import {ProfilService} from '../services/profil.service';
import {Profil} from '../models/profil';
import {concat} from 'rxjs';
import { FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  constructor(private profilservice: ProfilService, private router: Router) {
  }

  page = 1;
  count = 0;
  profils = [];
  usersprofil = [];
  oneprofil = Profil;
  public inputmodifie: string;
  message: string;
  colonne: string[] = ['libelle', 'liste', 'update', 'delete'];
  colonneliste: string[] = ['#', 'nom', 'prenom', 'login'];
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
        console.log('error');
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
    this.profilservice.getUsersProfil(profil.id).subscribe(
      res => {
        this.usersprofil = res['users'];
      },
      error => console.log('erreur de recuperation users by profil'),
      () => console.log('complete')
    );
  }

  // tslint:disable-next-line:typedef
  editProfil(profil: Profil) {
    const input = document.getElementById('input' + profil.id);
    const label = document.getElementById('label');
    const btn = document.getElementById('btn' + profil.id);
    input.style.display = 'block';
    label.style.display = 'block';
    // @ts-ignore
    $(btn).on('click', btn, (e) => {
      const prof = new Profil(profil.id, this.inputmodifie);
      const paragraphe = document.getElementById('message');
      paragraphe.style.display = 'block';
      this.profilservice.updateOneProfil(profil.id, prof).subscribe(
        res => {
          // @ts-ignore
          this.message = 'update ok';
        },
        error => {
          this.message = 'error modification';
        }
      );
    });
  }
  // tslint:disable-next-line:typedef
  deleteprofil(profil: Profil) {
    const res = confirm('Êtes-vous sûr de vouloir supprimer?');
    if (res) {
      const paragraphe = document.getElementById('message');
      paragraphe.style.display = 'block';
      this.profilservice.deleteOneProfil(profil.id).subscribe(
        res => {
          this.router.navigate(['profil']);
          this.message = 'delete ok';
        },
        error => {
          this.message = 'error delete';
        });
    }
  }
  // tslint:disable-next-line:typedef
}
