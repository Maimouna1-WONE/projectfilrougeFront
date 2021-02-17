import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  @ViewChild('filter', {static: false}) filter: ElementRef;
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
  colonne: string[] = ['avatar', 'profil', 'nom', 'prenom', 'login', 'telephone', 'email', 'adresse', 'genre', 'actions'];
  dataSource = new MatTableDataSource(this.users);
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
        Swal.fire({
          title: 'Error recuperation!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Yes'
        });
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
    this.val = this.getUserInfo();
    this.userService.getAll(0)
      .subscribe(
        res => {
          this.users = res;
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
  delete(user: User) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger m-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.userservice.deleteOneUser(user.id).subscribe();
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        this.refresh();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
  }
  exportAsXLSX(): void {
    this.excelservice.exportAsExcelFile(this.users, 'sample');
  }
  // tslint:disable-next-line:typedef
  refresh(){
    this.userService.getAll(0)
      .subscribe(
        res => {
          this.users = res;
        },
        error => {
          Swal.fire({
            title: 'Error!',
            text: 'Do you want to refresh',
            icon: 'error',
            confirmButtonText: 'Yes'
          });
        }
      );
  }
  // tslint:disable-next-line:typedef
  createPdf() {
    // tslint:disable-next-line:prefer-const
    let doc = new jsPDF.jsPDF();
    doc.setFontSize(18);
    doc.text('Liste des Utilisateurs', 11, 8);
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
