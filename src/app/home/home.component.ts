import { Component, OnInit} from '@angular/core';
import {AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service';
import {ProfilService} from '../services/profil.service';
import {User} from '../models/user';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DetailuserComponent} from '../detailuser/detailuser.component';
import {FlashMessagesService} from 'angular2-flash-messages';


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
  public getServerData(event?: PageEvent){
    this.userservice.getAll(event.pageIndex).subscribe(
      res => {
        this.users = res;
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
  getUserInfo()
  {
    this.info = JSON.parse(localStorage.getItem('currentUserInfo'));
  }
  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit()
  {
    this.getUserInfo();
    this.userService.getAll(0)
      .subscribe(
        res => {
          this.users = res;
        },
        error => console.log('error de recuperation users')
      );
  }
  // tslint:disable-next-line:typedef
  detail(user: User)
  {
    this.router.navigate(['detailuser', user.id]);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = user;
    this.dialog.open(DetailuserComponent, dialogConfig);
  }
  // tslint:disable-next-line:typedef
  deleteUser(user: User) {
    const res = confirm('Êtes-vous sûr de vouloir supprimer?');
    if (res) {
      const paragraphe = document.getElementById('message');
      paragraphe.style.display = 'block';
      this.userService.deleteOneUser(user.id).subscribe(
        res => {
          this.refresh();
          this.message = 'delete ok';
        },
        error => {
          this.message = 'error delete';
        });
    }
  }
  // tslint:disable-next-line:typedef
  update(user: User){
    const div = document.getElementById('update');
    div.style.display = 'block';
    const btn = document.getElementById('btn' + user.id);
    this.cour = user;
    if (!this.password){
      this.password = user.password;
    }
    if (!this.login){
      this.login = user.login;
    }
    if (!this.nom){
      this.nom = user.nom;
    }
    if (!this.prenom){
      this.prenom = user.prenom;
    }
    if (!this.email){
      this.email = user.email;
    }
    if (!this.adresse){
      this.adresse = user.adresse;
    }
    if (!this.avatar){
      this.avatar = user.avatar;
    }
    if (!this.telephone){
      this.telephone = user.telephone;
    }
    // @ts-ignore
    $(btn).on('click', btn, (e) => {
      const formdata = new FormData();
      // @ts-ignore
      formdata.append('login', this.login);
      formdata.append('password', this.password);
      formdata.append('prenom', this.prenom);
      formdata.append('nom', this.nom);
      formdata.append('adresse', this.adresse);
      formdata.append('genre', this.genre);
      formdata.append('telephone', this.telephone);
      formdata.append('email', this.email);
      // @ts-ignore
      formdata.append('avatar', this.avatar);
      this.userservice.updateOneProfil(user.id, formdata).subscribe(
        res => {
          this.flashmessage.show('Modification reussie', {cssClass: 'alert-success', timeout: 1000});
          this.refresh();
          div.style.display = 'none';
        },
        error => {
          this.flashmessage.show('echec', {cssClass: 'alert-danger', timeout: 1000});
          this.refresh();
        }
      );
    });
  }
  // tslint:disable-next-line:typedef
  onSelectFile(event) {
    if (event.target.files.length > 0) {
        this.avatar = event.target.files[0];
    }
  }
  // tslint:disable-next-line:typedef
  refresh(){
    this.userService.getAll(0)
      .subscribe(
        res => {
          this.users = res;
        },
        error => console.log('error de recuperation users')
      );
  }
}

