import { Component, OnInit} from '@angular/core';
import {AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service';
import {ProfilService} from '../services/profil.service';
import {User} from '../models/user';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DetailuserComponent} from './user/utilisateur/detailuser/detailuser.component';
import {FlashMessagesService} from 'angular2-flash-messages';
import {from, Observable, of, Subject} from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private userservice: UserService,
    private profilservice: ProfilService,
    private router: Router, private flashmessage: FlashMessagesService,
    private dialog: MatDialog) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  page = 1;
  count = 0;
  loading = false;
  users = [] ;
  user: User =
    {
      prenom: '',
      nom: '',
      login: '',
      adresse: '',
      genre: '',
      telephone: '',
      email: ''
    };
  cour: User;
  // tslint:disable-next-line:variable-name
  message: string;
  colonne: string[] = ['avatar', 'profil', 'nom', 'prenom', 'email', 'adresse', 'detail', 'update', 'delete'];
  currentUser: User;
  pageEvent: PageEvent;
  pageIndex: number;
  pageSize: number;
  nom: string; prenom: string; login: string;
  password: string; adresse: string;
  genre: string; telephone: string; email: string; avatar: any;
  // tslint:disable-next-line:typedef
  info: any;
  hide = true;
  // tslint:disable-next-line:typedef
  logout()
  {
    this.authenticationService.logout();
    this.router.navigate(['/login_check']);
  }
  // tslint:disable-next-line:typedef
  ngOnInit() {
  }
}

