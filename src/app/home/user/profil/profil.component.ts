import {Component, OnInit} from '@angular/core';
import {ProfilService} from '../../../services/profil.service';
import {Profil} from '../../../models/profil';
import {PageEvent} from '@angular/material/paginator';
import {ProfilSortie} from '../../../models/ProfilSortie';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

// tslint:disable-next-line:no-unused-expression label-position
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  constructor(private profilservice: ProfilService) {
  }
  libelle: string;
  page = 1;
  count = 0;
  profils: Profil[];
  usersprofil = [];
  oneprofil = Profil;
  public inputmodifie: string;
  message: string;
  colonne: string[] = ['libelle', 'liste', 'delete'];
  colonneliste: string[] = ['#', 'nom', 'prenom', 'login', 'avatar'];
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
  ngOnInit(): void {
    this.profilservice.getAllprofils(0)
      .subscribe(
        res => {
          this.profils = res;
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
  delete(p: Profil){
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
        this.profilservice.deleteOneProfil(p.id).subscribe();
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
  // tslint:disable-next-line:typedef
  update(profil: Profil) {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.inputmodifie = document.getElementById('td' + profil.id).textContent;
        // tslint:disable-next-line:triple-equals
        if (this.inputmodifie != ''){
          const prof = new Profil(this.inputmodifie);
          this.profilservice.updateOneProfil(profil.id, prof).subscribe();
          Swal.fire('Saved!', '', 'success');
        }
        else{
          Swal.fire({
            title: 'the field must not be empty',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Yes'
          });
        }
        this.refresh();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
  // tslint:disable-next-line:typedef
  refresh(){
    this.profilservice.getAllprofils(0)
      .subscribe(
        res => {
          this.profils = res;
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
}
