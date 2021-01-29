import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ProfilService} from '../../../services/profil.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {User} from '../../../models/user';
import {PageEvent} from '@angular/material/paginator';
import {ExcelService} from '../../../services/excel.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private userservice: UserService,
    private profilservice: ProfilService,
    private router: Router, private flashmessage: FlashMessagesService,
    private excelservice: ExcelService) {
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
      genre: '',
      email: ''
    };
  cour: User;
  // tslint:disable-next-line:variable-name
  message: string;
  colonne: string[] = ['profil', 'nom', 'prenom', 'login', 'telephone', 'email', 'adresse', 'genre'];
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
  val: User;
  allUsers: User[];
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
    return this.info;
  }
  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit()
  {
    // tslint:disable-next-line:only-arrow-functions typedef
    /*$(document).ready( function() {
      $('#mytable').DataTable();
    } );*/
    // $('#mainTable').editableTableWidget().numericInputExample().find('td:first').focus();
    this.val = this.getUserInfo();
    this.userService.getAll(0)
      .subscribe(
        res => {
          this.users = res;
        },
        error => console.log('error de recuperation users')
      );
    /*this.userService.getAllUsers()
      .subscribe(
        res1 => {
          this.allUsers = res1;
          console.log(res1);
        },
        error => console.log('error de recuperation users')
      );*/
  }

  exportAsXLSX(): void {
    this.excelservice.exportAsExcelFile(this.allUsers, 'sample');
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
  // tslint:disable-next-line:typedef
  createPdf() {
    // tslint:disable-next-line:prefer-const
    let doc = new jsPDF.jsPDF();
    doc.setFontSize(18);
    doc.text('My Team Detail', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    (doc as any).autoTable({
      html: '#myTable'
    });
    // below line for Open PDF document in new tab
    doc.output('dataurlnewwindow');
    // below line for Download PDF document
    doc.save('myteamdetail.pdf');
  }

}
